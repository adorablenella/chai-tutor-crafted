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
  const description = formData.get("description") as string;
  const subdomain = formData.get("subdomain") as string;
  const userId = session?.user.id;

  const { data: currentData } = await supabase.from("projects").select("subdomain").eq("subdomain", subdomain);
  if (currentData && currentData.length > 0) return { error: "This subdomain is already taken" };

  const homePageUuid = randomUUID();
  const payload: any = { project_name: name, user: userId, description };
  if (formData.get("apiKey")) payload.api_key = formData.get("apiKey") as string;
  if (formData.get("type")) payload.type = formData.get("type") as string;
  if (formData.get("subdomain")) payload.subdomain = formData.get("subdomain") as string;

  const { data, error } = await supabase.from("projects").insert(payload).select();
  console.log(payload, error);
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
        const { data: locData } = await supabase
          .from("projects")
          .update({ customDomain: value })
          .eq("uuid", site)
          .select();
        response = locData?.[0];
        await addDomainToVercel(value);

        // empty value means the user wants to remove the custom domain
      } else if (value === "") {
        const { data: locData } = await supabase
          .from("projects")
          .update({ customDomain: value })
          .eq("uuid", site)
          .select();
        response = locData?.[0];
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
      const BUCKET = "chaibuilder-blob-storage";

      const { data, error } = await supabase.storage.from(BUCKET).upload(`website-image/${filename}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

      if (error || !data?.path) {
        throw error || { error: "Something went wrong!" };
      }

      const publicURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${data.path}`;

      const { data: locData } = await supabase
        .from("projects")
        .update({ social_media_image: publicURL })
        .eq("uuid", site)
        .single();
      response = locData;
    } else if (key === "subdomain") {
      const { data } = await supabase.from("projects").select("*").eq("subdomain", value);
      if (data?.length && data[0].uuid !== site) throw { code: "P2002" };
      const { data: locData } = await supabase.from("projects").update({ subdomain: value }).eq("uuid", site).select();
      response = locData?.[0];
    }

    // * Updated site data! Revalidating tags
    if (site && (site?.customDomain || site?.subdomain)) {
      site?.subdomain && (await revalidateTag(`${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`));
      site?.customDomain && (await revalidateTag(`${site.customDomain}-metadata`));
    } else if (response && (site?.customDomain || response?.subdomain)) {
      const resp = response;
      resp?.subdomain && (await revalidateTag(`${resp.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`));
      resp?.customDomain && (await revalidateTag(`${resp.customDomain}-metadata`));
    }

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
    const { error: pageError } = await supabase.from("pages").delete().eq("project", id);
    if (pageError) return { error: pageError?.message };

    const { error } = await supabase.from("projects").delete().eq("uuid", id);
    if (error) return { error: error?.message };

    return { deleted: true, message: "Successfully deleted!" };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});

export const getSiteFromPostId = async (postId: string) => {
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase.from("post").select("project").eq("id", postId).single();
  if (error) return null;
  return data.project;
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

  const { data: post } = await supabase.from("post").select("*").eq("id", data.id).single();

  if (!post || !data) {
    return {
      error: "Post not found",
    };
  }

  try {
    const { data: response } = await supabase
      .from("post")
      .update({
        title: data.title,
        description: data.description,
        content: data.content,
      })
      .eq("id", data.id)
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

export const updatePostMetadata = withPostAuth(async (formData: FormData, postId: string, key: string) => {
  const supabase = createServerActionClient({ cookies });
  const value = formData.get(key) as string;
  let post = {};

  try {
    let response;
    if (key === "image") {
      const file = formData.get(key) as File;
      const filename = `${nanoid()}.${file.type.split("/")[1]}`;
      const BUCKET = "chaibuilder-blob-storage";

      const { data, error } = await supabase.storage.from(BUCKET).upload(`website-image/${filename}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

      if (error || !data?.path) {
        throw error || { error: "Something went wrong!" };
      }

      const publicURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${data.path}`;

      const { data: locData } = await supabase.from("post").update({ image: publicURL }).eq("id", postId).single();
      response = locData;
    } else if (key === "slug") {
      const slugPattern = /^[a-z0-9-]+$/;
      if (value.match(slugPattern) === null) throw { message: "Invalid slug format" };
      const { data, error } = await supabase.from("post").update({ slug: value }).eq("id", postId).select();
      if (error || data.length === 0) throw error;
      post = data[0];
    } else {
      const { data, error } = await supabase
        .from("post")
        .update({ [key]: value })
        .eq("id", postId)
        .select();
      if (error || data.length === 0) throw error;
      post = data[0];
    }

    // await revalidateTag(`${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`);
    // await revalidateTag(`${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`);

    // // if the site has a custom domain, we need to revalidate those tags too
    // post.site?.customDomain &&
    //   (await revalidateTag(`${post.site?.customDomain}-posts`),
    //   await revalidateTag(`${post.site?.customDomain}-${post.slug}`));

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
});

export const deletePost = withPostAuth(async (_: FormData, postId: string) => {
  const supabase = createServerActionClient({ cookies });
  try {
    const { data, error } = await supabase.from("post").delete().eq("id", postId).select();
    if (error || data.length === 0) throw error;
    return data[0];
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
