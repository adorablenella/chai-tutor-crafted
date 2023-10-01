import { lazy, Suspense } from "react";
import { RenderBlocksProps } from "../package/components/canvas/framework/types";
import { Skeleton } from "../package/radix/components/ui/skeleton";

const InsideBuilder = lazy(() => import("../package/components/canvas/framework/InsideBuilder"));
const LiveRender = lazy(() => import("./LiveRender"));

export const RenderBlocks = ({
  model = "page",
  snapshot,
}: RenderBlocksProps<"section" | "page"> & { snapshot: any }) => {
  const mode = typeof window !== "undefined" && window.self !== window.top ? "builder" : "live";
  const render =
    {
      live: <LiveRender model={model} snapshot={snapshot} />,
      builder: <InsideBuilder model={model} />,
    }[mode] || null;

  return <Suspense fallback={<Skeleton className="h-20" />}>{render}</Suspense>;
};
