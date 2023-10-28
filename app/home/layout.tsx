import "@/styles/site.css";
import "@/custom-blocks";
import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { getSiteByDomain } from "../helpers/project";

export default async function SiteLayout({ params, children }: { params: { domain: string }; children: ReactNode }) {
  const domain = "new." + process.env.NEXT_PUBLIC_ROOT_DOMAIN;
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

  return <>{children}</>;
}
