import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "./logout-button";
import { UserCircle2 } from "lucide-react";
import BlurImage from "@/components/blur-image";

export default async function Profile() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex w-full items-center justify-between">
      <Link
        href="/settings"
        className="flex w-5/6 flex-1 items-center space-x-3 rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800">
        {session?.user?.user_metadata?.avatar_url ? (
          <BlurImage
            src={session?.user?.user_metadata?.avatar_url}
            width={40}
            height={40}
            alt={"User avatar"}
            className="h-6 w-6 rounded-full"
          />
        ) : (
          <UserCircle2 className="h-6 w-6 rounded-full" />
        )}
        <span className="truncate text-xs font-medium">{session?.user?.user_metadata?.name}</span>
      </Link>
      <LogoutButton />
    </div>
  );
}
