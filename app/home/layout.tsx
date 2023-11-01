import "@/styles/site.css";
import "@/custom-blocks";
import { ReactNode } from "react";
import Script from "next/script";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Script src="/chaibuilder.js" defer />
      <Script src="//unpkg.com/alpinejs" defer />
      <Script src="//preline.co/assets/vendor/preline/preline.js" defer />
    </>
  );
}
