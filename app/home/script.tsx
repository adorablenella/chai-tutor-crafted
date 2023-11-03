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
          gtag("config", "G-HSBN16R1XQ");
        }}
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-HSBN16R1XQ`}
      />
      {process.env.NODE_ENV === "production" ? (
        <script
          id="clarity-analytics"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "f9du7ptib5");`,
          }}
        />
      ) : null}
    </>
  );
};
