import { fetchRouteSnapshot, RenderBlocks } from "@/app/app/(dashboard)/editor/next";

export default async function SiteHomePage({ params }: { params: { domain: string } }) {
  const snapshot: any = await fetchRouteSnapshot("", params.domain);
  return <RenderBlocks snapshot={snapshot} />;
}
