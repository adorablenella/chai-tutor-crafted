import { redirect } from "next/navigation";
import PostCard from "./post-card";
import Image from "next/image";
import { getSession } from "@/lib/auth";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Posts({
  siteId,
  projectData,
  limit,
}: {
  siteId?: string;
  projectData: any;
  limit?: number;
}) {
  const supabase = createServerComponentClient({ cookies });
  const session = await getSession();
  if (!session?.user) redirect("/login");

  const { data: posts = [] } = await supabase.from("post").select("*").eq("project", siteId);

  return posts && posts.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {posts.map((post) => (
        <PostCard key={post.id} data={post as any} projectData={projectData} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl">No Posts Yet</h1>
      <Image alt="missing post" src="https://illustrations.popsy.co/gray/graphic-design.svg" width={400} height={400} />
      <p className="text-lg text-stone-500">You do not have any posts yet. Create one to get started.</p>
    </div>
  );
}
