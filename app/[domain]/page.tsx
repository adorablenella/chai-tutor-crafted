import { RenderBlocks } from "@/sdk/next";

export default async function SiteHomePage({ params }: { params: { domain: string } }) {
  return <RenderBlocks slug={"_home"} domain={params.domain} />;
}
