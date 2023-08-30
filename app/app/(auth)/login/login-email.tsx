"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import LoadingDots from "@/components/icons/loading-dots";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

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

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const attemptLogin = useCallback(
    async (evt: any) => {
      evt.preventDefault();
      setLogin("email");
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });
      if (error) {
        setLogin("error");
        return;
      }

      setLogin("success");
      setEmail(() => "");
    },
    [email, supabase.auth],
  );

  const loginWithGoogle = useCallback(async () => {
    setLogin("google");
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/api/auth/callback` },
    });
  }, [supabase.auth]);

  return (
    <>
      {login === "success" && (
        <div className="text-green-500">
          <CheckCircle2 className="h-4 w-4" color="#22c55e" />
          <p>We have sent you an email with magic link to login to your account</p>
        </div>
      )}
      <div>
        <input
          className={`${
            loading
              ? "cursor-not-allowed bg-stone-50 dark:bg-stone-800"
              : "bg-white hover:bg-stone-50 active:bg-stone-100 dark:bg-black dark:hover:border-white dark:hover:bg-black"
          } group my-2 flex h-10 w-full items-center justify-center space-x-2 rounded-md border border-stone-200 text-white transition-colors duration-75 focus:outline-none dark:border-stone-700`}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <button
          disabled={loading}
          onClick={attemptLogin}
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
