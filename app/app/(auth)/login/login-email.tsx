"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import LoadingDots from "@/components/icons/loading-dots";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LoginWithEmail() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "" });
  // Get error message added by next/auth in URL.
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error;
    errorMessage && toast.error(errorMessage);
  }, [error]);

  const router = useRouter();
  const supabase = createClientComponentClient();
  const loginWithEmail = async () => {
    await supabase.auth.signUp({
      email: form.email,
      password: "password",
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  return (
    <>
      <div>
        <input
          className={`${
            loading
              ? "cursor-not-allowed bg-stone-50 dark:bg-stone-800"
              : "bg-white hover:bg-stone-50 active:bg-stone-100 dark:bg-black dark:hover:border-white dark:hover:bg-black"
          } group my-2 flex h-10 w-full items-center justify-center space-x-2 rounded-md border border-stone-200 text-white transition-colors duration-75 focus:outline-none dark:border-stone-700`}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          type="email"
          placeholder="Email"
        />
        <button
          disabled={loading}
          onClick={() => {
            setLoading(true);
            loginWithEmail();
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
              <p className="text-sm font-medium text-stone-600 dark:text-stone-400">Sign In</p>
            </>
          )}
        </button>
      </div>
    </>
  );
}
