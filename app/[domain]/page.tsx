import { fetchRouteSnapshot, RenderBlocks } from "../../sdk/next";

export default async function SiteHomePage({ params }: { params: { domain: string } }) {
  const snapshot: any = await fetchRouteSnapshot("", params.domain);
  return <RenderBlocks snapshot={snapshot} />;
}
