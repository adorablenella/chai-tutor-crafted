import { fetchRouteSnapshot, RenderBlocks } from "@/app/app/(dashboard)/editor/next";

export const dynamicParams = true;
export default async function Page({ params }: { params: { domain: string; slug: string } }) {
  const snapshot: any = await fetchRouteSnapshot(params.slug, params.domain);
  return <RenderBlocks snapshot={snapshot} />;
}
