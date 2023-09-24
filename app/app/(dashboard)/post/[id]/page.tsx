import { getSession } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Editor from "@/components/editor";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function PostPage({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });
  const session = await getSession();
  if (!session) redirect("/login");

  const { data } = await supabase.from("post").select("*").eq("id", params.id).single();

  if (!data) notFound();

  return <Editor post={data as any} />;
}
