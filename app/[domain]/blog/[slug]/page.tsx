import { fetchRouteSnapshot, RenderBlocks } from "@/sdk/next";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { domain: string; slug: string } }) {
  const snapshot: any = await fetchRouteSnapshot(`blog/${params.slug}`, params.domain);
  if (snapshot.notFound) {
    return notFound();
  }
  return <RenderBlocks slug={`blog/${params.slug}`} domain={params.domain} />;
}
