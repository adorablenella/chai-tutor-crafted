import * as React from "react";
import { TBlock } from "@/sdk/package/types/TBlock";
import { cn } from "@/sdk/package/radix/lib/utils";
import { registerChaiBlock } from "@/sdk/next/server";
import { Skeleton } from "@/sdk/package/radix/components/ui/skeleton";

const LoadingBlock = (props: TBlock & { blockProps: any }) => {
  return (
    <div {...props.blockProps} className={cn("flex h-10 flex-col items-center justify-center", props.className)}>
      <Skeleton className="h-full w-full"></Skeleton>
    </div>
  );
};

registerChaiBlock(LoadingBlock, {
  type: "LoadingBlock",
  label: "LoadingBlock",
  category: "core",
  group: "basic",
  hidden: true,
  props: {},
});
