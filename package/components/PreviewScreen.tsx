import React, { Suspense } from "react";
import { usePreviewMode } from "../hooks";
import { cn } from "../radix/lib/utils";
import { Button } from "../radix/components/ui/button";
import { Skeleton } from "../radix/components/ui/skeleton";
import { useBuilderProp } from "../hooks/useBuilderProp";

export const PreviewScreen = () => {
  const [isPreviewOn, setPreviewMode] = usePreviewMode();
  const previewComponent = useBuilderProp("previewComponent");
  return (
    <div className={cn("fixed bg-background inset-0 z-[999]", isPreviewOn ? "block" : "hidden")}>
      <Button size="sm" className="absolute top-0 right-0 m-4" onClick={() => setPreviewMode(false)}>
        Close Preview
      </Button>
      <div>
        {previewComponent ? (
          <Suspense fallback={<Skeleton className="w-full h-96" />}>{React.createElement(previewComponent)}</Suspense>
        ) : null}
      </div>
    </div>
  );
};
