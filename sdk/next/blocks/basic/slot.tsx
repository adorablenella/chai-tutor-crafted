import * as React from "react";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerServerBlock } from "@/sdk/next/server";
import { cn } from "@/sdk/package/radix/lib/utils";

const SlotBlock = (
  props: TBlock & { children: React.ReactNode } & {
    blockProps: Record<string, string>;
    styles: Record<string, string>;
    emptyStyles?: string;
  },
) => {
  const { blockProps, styles, children } = props;
  let emptySlot: React.ReactNode | null = null;
  if (!children) {
    emptySlot = (
      // @ts-ignore
      <div className={cn("flex flex-col items-center justify-center", props.emptyStyles?.className)}>
        <div className="h-full w-full rounded-md border-4 border-dashed">
          <p className="truncate p-1 text-left text-xs text-gray-400">Slot: {props._name}</p>
        </div>
      </div>
    );
  }
  return React.createElement("div", { ...styles, ...blockProps, droppable: "yes" }, children || emptySlot);
};

registerServerBlock(SlotBlock, {
  type: "Slot",
  label: "Slot",
  group: "basic",
  category: "core",
  hidden: true,
  props: {},
});
