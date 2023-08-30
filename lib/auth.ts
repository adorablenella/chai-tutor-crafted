import { cookies } from "next/headers";
import { createServerComponentClient, Session } from "@supabase/auth-helpers-nextjs";

export function getSession(): Promise<Session | null> {
  return new Promise(async (resolve, reject) => {
    const supabase = createServerComponentClient({ cookies });
    const { data: session, error } = await supabase.auth.getSession();
    return resolve(session.session || null);
  });
}

export function withSiteAuth(action: any) {
  return async (formData: FormData | null, siteId: string, key: string | null) => {
    const session = await getSession();
    if (!session) {
      return {
        error: "Not authenticated",
      };
    }
    const site: any = {};
    // await prisma.site.findUnique({
    //   where: {
    //     id: siteId,
    //   },
    // });
    if (!site || site.userId !== session.user.id) {
      return {
        error: "Not authorized",
      };
    }

    return action(formData, site, key);
  };
}

export function withPostAuth(action: any) {
  return async (formData: FormData | null, postId: string, key: string | null) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    const post = {};
    // const post = await prisma.post.findUnique({
    //   where: {
    //     id: postId,
    //   },
    //   include: {
    //     site: true,
    //   },
    // });
    // if (!post || post.userId !== session.user.id) {
    //   return {
    //     error: "Post not found",
    //   };
    // }

    return action(formData, post, key);
  };
}
