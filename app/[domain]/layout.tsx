import "@/styles/site.css";
import "@/custom-blocks";
import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { getSiteByDomain } from "../helpers/project";
import Script from "next/script";

export default async function SiteLayout({ params, children }: { params: { domain: string }; children: ReactNode }) {
  const { domain } = params;
  const data = await getSiteByDomain(domain);

  if (!data) {
    return notFound();
  }

  // Optional: Redirect to custom domain if it exists
  if (
    domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    data.customDomain &&
    process.env.REDIRECT_TO_CUSTOM_DOMAIN_IF_EXISTS === "true"
  ) {
    return redirect(`https://${data.customDomain}`);
  }

  return (
    <>
      {children}
      <Script src={"/chaibuilder.js"} defer />
      <Script src="//unpkg.com/alpinejs" defer />
      <Script src={"https://preline.co/assets/vendor/preline/preline.js"} defer />
    </>
  );
}
