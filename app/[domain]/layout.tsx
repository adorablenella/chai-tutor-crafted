import "@/styles/site.css";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSiteByDomain } from "../helpers/project";
import "@/custom-blocks";
import { Preline } from "@/components/preline";

export default async function SiteLayout({ params, children }: { params: { domain: string }; children: ReactNode }) {
  const { domain } = params;
  const data = await getSiteByDomain(domain);

  if (!data) {
    return <div className="text-white">Data not found</div>;
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
      <Preline />
      {children}
    </>
  );
}
