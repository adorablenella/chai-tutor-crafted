import React from "react";
import { registerChaiBlock } from "@/sdk/next/server";
import { Slot } from "@/sdk/package/controls/controls";

const TwoColumnsLayout: React.FC = ({ leftColumn, rightColumn, blockProps }: any) => {
  return (
    <div {...blockProps} className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 md:grid-cols-2 md:items-center md:gap-8 xl:gap-20">
        <div>{leftColumn}</div>
        <div className="relative ml-4">{rightColumn}</div>
      </div>
    </div>
  );
};

registerChaiBlock(TwoColumnsLayout, {
  type: "TwoColumnLayout",
  label: "Two Column Layout",
  group: "layout",
  preview: "https://placehold.it/300/100",
  props: {
    leftColumn: Slot({ name: "Left Column", emptyStyles: "h-40" }),
    rightColumn: Slot({ name: "Right Column", emptyStyles: "h-40" }),
  },
});
