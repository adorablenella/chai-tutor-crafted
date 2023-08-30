"use client";

import { LogOut } from "lucide-react";
import { useSupabaseClient } from "@/lib/hooks/use-supabase-client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const logoutUser = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <button
      onClick={logoutUser}
      className="rounded-lg p-1.5 text-stone-700 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800">
      <LogOut width={18} />
    </button>
  );
}
