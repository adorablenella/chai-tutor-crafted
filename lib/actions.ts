"use server";

import { revalidateTag } from "next/cache";
import { withPostAuth, withSiteAuth } from "./auth";
import { getSession } from "@/lib/auth";
import { addDomainToVercel, removeDomainFromVercelProject, validDomainRegex } from "@/lib/domains";
import { put } from "@vercel/blob";
import { customAlphabet } from "nanoid";
import { getBlurDataURL } from "@/lib/utils";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 7); // 7-character random string

export const createSite = async (formData: FormData) => {
  const session = await getSession();
  if (!session?.user.id) throw "Not authenticated";

  const supabase = createServerActionClient({ cookies });
  const name = formData.get("name") as string;
  const subdomain = formData.get("subdomain") as string;
  const userId = session?.user.id;

  const { data: currentData } = await supabase.from("projects").select("subdomain").eq("subdomain", subdomain);
  if (currentData && currentData.length > 0) return { error: "Subdomain already used" };

  const homePageUuid = randomUUID();
  const payload = { project_name: name, subdomain, user: userId };
  const { data, error } = await supabase.from("projects").insert(payload).select();
  if (error || data.length === 0) return { error: error ? error.message : "Something went wrong" };

  await supabase.from("pages").insert({
    blocks: [],
    slug: "home",
    page_name: "Home",
    project: data[0].uuid,
    uuid: homePageUuid,
  });

  await supabase.from("projects").update({ homepage: homePageUuid }).eq("uuid", data[0].uuid);
  await revalidateTag(`${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`);
  return data[0];
};

export const updateSite = withSiteAuth(async (formData: FormData, site: any, key: string) => {
  const supabase = createServerActionClient({ cookies });
  const value = formData.get(key) as string;

  try {
    let response;

    if (key === "customDomain") {
      if (value.includes("vercel.pub")) {
        return {
          error: "Cannot use vercel.pub subdomain as your custom domain",
        };

        // if the custom domain is valid, we need to add it to Vercel
      } else if (validDomainRegex.test(value)) {
        // response = await prisma.site.update({
        //   where: {
        //     id: site.id,
        //   },
        //   data: {
        //     customDomain: value,
        //   },
        // });
        await addDomainToVercel(value);

        // empty value means the user wants to remove the custom domain
      } else if (value === "") {
        // response = await prisma.site.update({
        //   where: {
        //     id: site.id,
        //   },
        //   data: {
        //     customDomain: null,
        //   },
        // });
      }

      // if the site had a different customDomain before, we need to remove it from Vercel
      if (site.customDomain && site.customDomain !== value) {
        response = await removeDomainFromVercelProject(site.customDomain);

        /* Optional: remove domain from Vercel team 

          // first, we need to check if the apex domain is being used by other sites
          const apexDomain = getApexDomain(`https://${site.customDomain}`);
          const domainCount = await prisma.site.count({
            where: {
              OR: [
                {
                  customDomain: apexDomain,
                },
                {
                  customDomain: {
                    endsWith: `.${apexDomain}`,
                  },
                },
              ],
            },
          });

          // if the apex domain is being used by other sites
          // we should only remove it from our Vercel project
          if (domainCount >= 1) {
            await removeDomainFromVercelProject(site.customDomain);
          } else {
            // this is the only site using this apex domain
            // so we can remove it entirely from our Vercel team
            await removeDomainFromVercelTeam(
              site.customDomain
            );
          }
          
          */
      }
    } else if (key === "image" || key === "logo") {
      const file = formData.get(key) as File;
      const filename = `${nanoid()}.${file.type.split("/")[1]}`;

      const { data, error } = await supabase.storage
        .from("chaibuilder-blob-storage")
        .upload(`website-image/${filename}`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      const url = data?.path;

      // const blurhash = key === "image" ? await getBlurDataURL(url) : null;

      const { data: locData } = await supabase.from("projects").update({ webclip: url }).eq("uuid", site).single();
      response = locData;
    } else {
      // response = await prisma.site.update({
      //   where: {
      //     id: site.id,
      //   },
      //   data: {
      //     [key]: value,
      //   },
      // });
    }
    console.log(
      "Updated site data! Revalidating tags: ",
      `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
      `${site.customDomain}-metadata`,
    );
    site?.subdomain && (await revalidateTag(`${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`));
    site?.customDomain && (await revalidateTag(`${site.customDomain}-metadata`));

    return response;
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: `This ${key} is already taken`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
});

export const deleteProject = withSiteAuth(async (_: FormData, id: any) => {
  const supabase = createServerActionClient({ cookies });

  try {
    // * Need confirmation on delete (remove or update col)
    const { data, error } = await supabase.from("projects").delete().eq("uuid", id).select();
    if (error) return { error: error?.message };

    await revalidateTag(`${data[0].subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`);
    data[0].customDomain && (await revalidateTag(`${data[0].customDomain}-metadata`));
    return data[0];
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});

export const getSiteFromPostId = async (postId: string) => {
  // const post = await prisma.post.findUnique({
  //   where: {
  //     id: postId,
  //   },
  //   select: {
  //     siteId: true,
  //   },
  // });
  return ""; //post?.siteId;
};

export const createPost = withSiteAuth(async (_: FormData, site: any) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  // const response = await prisma.post.create({
  //   data: {
  //     siteId: site.id,
  //     userId: session.user.id,
  //   },
  // });

  await revalidateTag(`${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`);
  site.customDomain && (await revalidateTag(`${site.customDomain}-posts`));

  return {};
});

// creating a separate function for this because we're not using FormData
export const updatePost = async (data: any) => {
  const session = await getSession();
  if (!session?.user.id) return { error: "Not authenticated" };

  const supabase = createServerActionClient({ cookies });

  const { data: post } = await supabase.from("pages").select("*").eq("uuid", data.uuid).single();

  if (!post || !data) {
    return {
      error: "Post not found",
    };
  }

  try {
    const { data: response } = await supabase
      .from("pages")
      .update({
        title: data.title,
        description: data.description,
        content: data.content,
      })
      .eq("uuid", data.uuid)
      .single();

    // await revalidateTag(`${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`);
    // await revalidateTag(`${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`);

    // // if the site has a custom domain, we need to revalidate those tags too
    // post.site?.customDomain &&
    //   (await revalidateTag(`${post.site?.customDomain}-posts`),
    //   await revalidateTag(`${post.site?.customDomain}-${post.slug}`));

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updatePostMetadata = withPostAuth(
  async (
    formData: FormData,
    post: any & {
      site: any;
    },
    key: string,
  ) => {
    const value = formData.get(key) as string;

    try {
      let response;
      if (key === "image") {
        const file = formData.get("image") as File;
        const filename = `${nanoid()}.${file.type.split("/")[1]}`;

        const { url } = await put(filename, file, {
          access: "public",
        });

        const blurhash = await getBlurDataURL(url);

        // response = await prisma.post.update({
        //   where: {
        //     id: post.id,
        //   },
        //   data: {
        //     image: url,
        //     imageBlurhash: blurhash,
        //   },
        // });
      } else {
        // response = await prisma.post.update({
        //   where: {
        //     id: post.id,
        //   },
        //   data: {
        //     [key]: key === "published" ? value === "true" : value,
        //   },
        // });
      }

      await revalidateTag(`${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`);
      await revalidateTag(`${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`);

      // if the site has a custom domain, we need to revalidate those tags too
      post.site?.customDomain &&
        (await revalidateTag(`${post.site?.customDomain}-posts`),
        await revalidateTag(`${post.site?.customDomain}-${post.slug}`));

      return response;
    } catch (error: any) {
      if (error.code === "P2002") {
        return {
          error: `This slug is already in use`,
        };
      } else {
        return {
          error: error.message,
        };
      }
    }
  },
);

export const deletePost = withPostAuth(async (_: FormData, post: any) => {
  try {
    return {};
    // const response = await prisma.post.delete({
    //   where: {
    //     id: post.id,
    //   },
    //   select: {
    //     siteId: true,
    //   },
    // });
    // return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});

export const editUser = async (formData: FormData, _id: unknown, key: string) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const value = formData.get(key) as string;

  try {
    return {};
    // const response = await prisma.user.update({
    //   where: {
    //     id: session.user.id,
    //   },
    //   data: {
    //     [key]: value,
    //   },
    // });
    // return response;
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: `This ${key} is already in use`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};
