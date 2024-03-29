"use client";

import Script from "next/script";
import { useSupabaseClient } from "@/lib/hooks/use-supabase-client";

export const ChaiScripts = () => {
  const supabaseClient = useSupabaseClient();
  return (
    <>
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
        src="//cdn.paddle.com/paddle/paddle.js"
        defer
      />
      <Script
        onLoad={() => {
          // @ts-ignore
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            // @ts-ignore
            dataLayer.push(arguments);
          }
          // @ts-ignore
          gtag("js", new Date());
          // @ts-ignore
          gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID);
        }}
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
      />
      {process.env.NODE_ENV === "production" ? (
        <script
          id="clarity-analytics"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "j3129tfps9");`,
          }}
        />
      ) : null}
    </>
  );
};
