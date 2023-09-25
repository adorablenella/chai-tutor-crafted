import { fetchRouteSnapshot, RenderBlocks } from "@/sdk/next";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { domain: string; slug: string } }) {
  console.log(params);
  const snapshot: any = await fetchRouteSnapshot(`blog/${params.slug}`, params.domain);
  if (snapshot.notFound) {
    return notFound();
  }
  return <RenderBlocks snapshot={snapshot} />;
}
