"use client";

import Script from "next/script";
import { useSupabaseClient } from "@/lib/hooks/use-supabase-client";

export const ChaiScripts = () => {
  const supabaseClient = useSupabaseClient();
  return (
    <Script
      onLoad={() => {
        if (process.env.NODE_ENV === "development") {
          // @ts-ignore
          Paddle.Environment.set("sandbox");
        }

        // @ts-ignore
        Paddle.Setup({
          vendor: parseInt(process.env.NEXT_PUBLIC_PADDLE_VENDOR || "0"),
          eventCallback: async function ({ event, eventData }: { event: string; eventData: any }) {
            if (event === "Checkout.Complete") {
              const { data } = await supabaseClient.auth.getUser();
              fetch("/api/subscribe/success", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: data.user?.id, transactionData: eventData }),
              }).then((res) => {
                if (res.status === 200) {
                  window.location.href = "/";
                }
              });
            }
          },
        });
      }}
      src="https://cdn.paddle.com/paddle/paddle.js"
      defer
    />
  );
};
