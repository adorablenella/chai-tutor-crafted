import { fetchRouteSnapshot, RenderBlocks } from "@/sdk/next";
import { get } from "lodash";

export async function generateMetadata({ params }: { params: { domain: string } }) {
  const snapshot = await fetchRouteSnapshot(params.domain);
  return {
    title: get(snapshot, "pageData.seo_data.title", ""),
    description: get(snapshot, "pageData.seo_data.description", ""),
    openGraph: {
      title: get(snapshot, "pageData.seo_data.title", ""),
      description: get(snapshot, "pageData.seo_data.description", ""),
      type: "website",
    },
    themeColor: get(snapshot, "projectData.branding_options._primaryColor", ""),
    twitter: {
      card: "summary_large_image",
      title: get(snapshot, "pageData.seo_data.title", ""),
      description: get(snapshot, "pageData.seo_data.description", ""),
      images: [get(snapshot, "pageData.seo_data.image", "")],
    },
  };
}

export default async function SiteHomePage({ params }: { params: { domain: string } }) {
  return <RenderBlocks domain={params.domain} />;
}
