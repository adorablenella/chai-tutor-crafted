import { getSession } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Editor from "@/components/editor";
import { getPost } from "@/app/helpers/post";
import { useSupabaseClient } from "@/lib/hooks/use-supabase-client";

export default async function PostPage({ params }: { params: { id: string } }) {
  const supabase = useSupabaseClient();
  const session = await getSession();
  if (!session) redirect("/login");

  const { data } = await supabase.from("pages").select("*").eq("uuid", params.id).single();

  if (!data) notFound();

  return <Editor post={data as any} />;
}
