import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Editor from "@/components/editor";
import { getPost } from "@/app/helpers/post";

export default async function PostPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await getPost(params.id);
  if (!data) {
    notFound();
  }

  return <Editor post={data as any} />;
}
