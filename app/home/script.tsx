"use client";

import Script from "next/script";

export const ChaiScripts = () => {
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
        });
      }}
      src="//cdn.paddle.com/paddle/paddle.js"
      defer
    />
  );
};
