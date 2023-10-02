"use client";

import { Loader, LogOut } from "lucide-react";
import { useSupabaseClient } from "@/lib/hooks/use-supabase-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = useSupabaseClient();
  const router = useRouter();

  const logoutUser = async () => {
    if (isLoading) return;
    setIsLoading(true);
    await supabase.auth.signOut();
    router.refresh();
    setIsLoading(false);
  };

  return (
    <button
      onClick={logoutUser}
      disabled={isLoading}
      className="rounded-lg p-1.5 text-stone-700 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800">
      {isLoading ? <Loader width={18} className="animate-spin" /> : <LogOut width={18} />}
    </button>
  );
}
