"use client";

import Script from "next/script";

export const ChaiScripts = () => {
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
    </>
  );
};
