"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import LoadingDots from "@/components/icons/loading-dots";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LoginButton() {
  const [loading, setLoading] = useState(false);

  // Get error message added by next/auth in URL.
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error;
    errorMessage && toast.error(errorMessage);
  }, [error]);

  const supabase = createClientComponentClient();
  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  return (
    <button
      disabled={loading}
      onClick={() => {
        setLoading(true);
        loginWithGoogle();
      }}
      className={`${
        loading
          ? "cursor-not-allowed bg-stone-50 dark:bg-stone-800"
          : "bg-white hover:bg-stone-50 active:bg-stone-100 dark:bg-black dark:hover:border-white dark:hover:bg-black"
      } group my-2 flex h-10 w-full items-center justify-center space-x-2 rounded-md border border-stone-200 transition-colors duration-75 focus:outline-none dark:border-stone-700`}>
      {loading ? (
        <LoadingDots color="#A8A29E" />
      ) : (
        <>
          <svg width={19} height={19} viewBox="0 0 0.76 0.76" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M.713.387A.29.29 0 0 0 .706.318H.387v.123h.186a.16.16 0 0 1-.07.108v.005l.1.077.007.001A.321.321 0 0 0 .713.387Z"
              fill="#4285F4"
            />
            <path
              d="M.387.713A.325.325 0 0 0 .612.632L.505.55a.203.203 0 0 1-.119.033.204.204 0 0 1-.194-.138H.19l-.105.08-.002.003a.341.341 0 0 0 .304.185Z"
              fill="#34A853"
            />
            <path
              d="M.195.446A.201.201 0 0 1 .183.38c0-.024.005-.045.011-.066V.309L.087.229.084.231A.328.328 0 0 0 .048.38c0 .053.014.105.036.149L.195.446Z"
              fill="#FBBC05"
            />
            <path
              d="M.387.176a.19.19 0 0 1 .131.05L.614.134A.335.335 0 0 0 .387.048a.338.338 0 0 0-.303.183l.11.083A.205.205 0 0 1 .387.176Z"
              fill="#EB4335"
            />
          </svg>
          <p className="text-sm font-medium text-stone-600 dark:text-stone-400">Login with Google</p>
        </>
      )}
    </button>
  );
}
