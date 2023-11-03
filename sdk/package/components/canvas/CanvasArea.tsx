import React, { lazy, Suspense } from "react";
import { CanvasTopBar } from "./topbar/CanvasTopBar";
import { useBuilderProp } from "../../hooks/useBuilderProp";
import { BUILDER_MODES } from "../../constants/BUILDER_MODES";
import { Skeleton } from "@/sdk/package/radix/components/ui/skeleton";
import { useAtom } from "jotai";
import { addBlocksModalAtom } from "@/sdk/package/store/blocks";

const StaticCanvas = lazy(() => import("./static/StaticCanvas"));
const FrameworkCanvas = lazy(() => import("./framework/FrameworkCanvas"));
const AddBlocksPanel = lazy(() => import("../sidepanels/panels/add-blocks/AddBlocks"));

const CanvasArea: React.FC = () => {
  const builderMode = useBuilderProp("mode", BUILDER_MODES.STATIC);
  const [addBlocks, setAddBlocks] = useAtom(addBlocksModalAtom);
  const canvas = {
    [BUILDER_MODES.STATIC]: <StaticCanvas />,
    [BUILDER_MODES.FRAMEWORK]: <FrameworkCanvas />,
  }[builderMode];

  return (
    <div className="flex h-full w-full flex-col">
      <CanvasTopBar />
      <div className="relative flex-1 overflow-hidden bg-slate-800/20 bg-[linear-gradient(to_right,#EEE_0.5px,transparent_0.5px),linear-gradient(to_bottom,#EEE_0.5px,transparent_0.5px)] bg-[size:12px_12px]">
        <Suspense fallback={<Skeleton className="h-full" />}>{canvas}</Suspense>
        {addBlocks ? (
          <div
            onClick={() => setAddBlocks(false)}
            className={"absolute inset-0 z-50 flex items-center bg-black/30 backdrop-blur-sm"}>
            <div
              onClick={(e) => e.stopPropagation()}
              className={
                "mx-auto h-[90%] w-[90%] max-w-3xl rounded-md bg-white p-4 shadow-lg shadow-black/10 xl:w-[65%]"
              }>
              <AddBlocksPanel />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CanvasArea;
