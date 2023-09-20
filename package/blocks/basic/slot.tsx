import * as React from "react";
import { TBlock } from "../../types/TBlock";
import { registerInternalBlock } from "../../controls";

const SlotBlock = (props: TBlock & { children: React.ReactNode }) => {
  const { blockProps, styles, children } = props;
  let emptySlot: React.ReactNode | null = null;
  if (!children) {
    emptySlot = <div className="h-20 border-dashed border-1 flex items-center justify-center"> + Add blocks here</div>;
  }
  return React.createElement("div", { ...styles, ...blockProps, droppable: "yes" }, children || emptySlot);
};

registerInternalBlock(SlotBlock, {
  type: "Slot",
  label: "Slot",
  group: "basic",
  category: "core",
  hidden: true,
  props: {},
});
