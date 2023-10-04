import { lazy, Suspense } from "react";
import { RenderBlocksProps } from "../package/components/canvas/framework/types";
import { Skeleton } from "../package/radix/components/ui/skeleton";

const InsideBuilder = lazy(() => import("../package/components/canvas/framework/InsideBuilder"));
const NextBlocksRenderer = lazy(() => import("./NextBlocksRenderer"));

export const RenderBlocks = ({
  model = "page",
  slug,
  domain,
}: RenderBlocksProps<"section" | "page"> & { slug: string; domain: string }) => {
  const mode = typeof window !== "undefined" && window.self !== window.top ? "builder" : "live";
  const render =
    {
      live: <NextBlocksRenderer model={model} slug={slug} domain={domain} />,
      builder: <InsideBuilder model={model} />,
    }[mode] || null;

  return <Suspense fallback={<Skeleton className="h-20" />}>{render}</Suspense>;
};
