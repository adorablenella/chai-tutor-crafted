import React, { lazy, Suspense } from "react";
import { CanvasTopBar } from "./topbar/CanvasTopBar";
import { useBuilderProp } from "../../hooks/useBuilderProp";
import { BUILDER_MODES } from "../../constants/BUILDER_MODES";
import { Skeleton } from "../../radix/components/ui/skeleton";

const StaticCanvas = lazy(() => import("./static/StaticCanvas"));
const FrameworkCanvas = lazy(() => import("./framework/FrameworkCanvas"));

const CanvasArea: React.FC = () => {
  const builderMode = useBuilderProp("mode", BUILDER_MODES.STATIC);
  const canvas = {
    [BUILDER_MODES.STATIC]: <StaticCanvas />,
    [BUILDER_MODES.FRAMEWORK]: <FrameworkCanvas />,
  }[builderMode];

  return (
    <div className="h-full w-full flex flex-col">
      <CanvasTopBar />
      <div className="flex-1 bg-slate-800/20 overflow-hidden">
        <Suspense fallback={<Skeleton className="h-full" />}>{canvas}</Suspense>
      </div>
    </div>
  );
};

export default CanvasArea;
