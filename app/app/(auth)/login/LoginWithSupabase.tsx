"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
);

export default function LoginButton() {
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `http://app.localhost:3000` },
    });

    if (error) {
      console.error("Error signing in with Google:", error);
    }

    console.log("## User data", data);
  };

  return (
    <button
      disabled={loading}
      onClick={signIn}
      className={`${
        loading
          ? "cursor-not-allowed bg-stone-50 dark:bg-stone-800"
          : "bg-white hover:bg-stone-50 active:bg-stone-100 dark:bg-black dark:hover:border-white dark:hover:bg-black"
      } group my-2 flex h-10 w-full items-center justify-center space-x-2 rounded-md border border-stone-200 transition-colors duration-75 focus:outline-none dark:border-stone-700`}
    >
      {loading ? (
        <LoadingDots color="#A8A29E" />
      ) : (
        <>
          <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
            Login with Google
          </p>
        </>
      )}
    </button>
  );
}
