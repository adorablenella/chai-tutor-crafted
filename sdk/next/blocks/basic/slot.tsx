import * as React from "react";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerServerBlock } from "@/sdk/next/server";

const SlotBlock = (
  props: TBlock & { children: React.ReactNode } & {
    blockProps: Record<string, string>;
    styles: Record<string, string>;
  },
) => {
  const { blockProps, styles, children } = props;
  let emptySlot: React.ReactNode | null = null;
  if (!children) {
    emptySlot = <div className="border-1 flex h-20 items-center justify-center border-dashed"> + Add blocks here</div>;
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
