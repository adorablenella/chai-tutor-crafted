"use client";

import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import LoadingDots from "@/components/icons/loading-dots";
import { createPost } from "@/app/helpers/post";

export default function CreatePostButton({ userId }: { userId: string }) {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const createNewPost = async () => {
    setIsLoading(true);
    const payload = {
      project: id,
      user: userId,
    };
    createPost(payload)
      .then((post) => {
        router.push(`/post/${post.id}`);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <button
      onClick={() => startTransition(createNewPost)}
      className={cn(
        "flex h-8 w-36 items-center justify-center space-x-2 rounded-lg border text-sm transition-all focus:outline-none sm:h-9",
        isPending || isLoading
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
      )}
      disabled={isPending}>
      {isPending || isLoading ? <LoadingDots color="#808080" /> : <p>Create New Post</p>}
    </button>
  );
}
