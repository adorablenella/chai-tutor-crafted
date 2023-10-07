import * as React from "react";
import { TBlock } from "../../types/TBlock";
import { registerInternalBlock } from "../../controls";
import { cn } from "@/sdk/package/radix/lib/utils";

const SlotBlock = (
  props: TBlock & { children: React.ReactNode } & {
    blockProps: Record<string, string>;
    styles: Record<string, string>;
  },
) => {
  const { blockProps, styles, children } = props;
  let emptySlot: React.ReactNode | null = null;
  if (!children) {
    emptySlot = (
      <div className={cn("flex h-20 flex-col items-center justify-center", props.className)}>
        <div className="h-full w-full rounded-md border-4 border-dashed" />
      </div>
    );
  }
  return React.createElement("div", { ...styles, ...blockProps }, children || emptySlot);
};

registerInternalBlock(SlotBlock, {
  type: "Slot",
  label: "Slot",
  group: "basic",
  category: "core",
  hidden: true,
  props: {},
});
