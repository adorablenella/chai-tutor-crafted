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
  return async (formData: FormData | null, id: string, key: string | null) => {
    const supabase = createServerComponentClient({ cookies });
    const session = await getSession();
    if (!session) {
      return {
        error: "Not authenticated",
      };
    }
    const { data } = await supabase.from("projects").select("*").eq("uuid", id);
    if (!data || data.length < 1) {
      return {
        error: "Project not found",
      };
    }

    return action(formData, id, key);
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
    return action(formData, postId, key);
  };
}
