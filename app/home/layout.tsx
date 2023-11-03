import "@/styles/site.css";
import "@/custom-blocks";
import { ReactNode } from "react";
import Script from "next/script";
import { ChaiScripts } from "@/app/home/script";

function isProductionEnv() {
  return process.env.NODE_ENV === "production";
}

export default async function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Script src="/chaibuilder.js" defer />
      <Script src="//unpkg.com/alpinejs" defer />
      <Script src="//preline.co/assets/vendor/preline/preline.js" defer />
      <ChaiScripts />
      {isProductionEnv() ? (
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
        />
      ) : null}
      {isProductionEnv() ? (
        <script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
                  `,
          }}
        />
      ) : null}
    </>
  );
}
