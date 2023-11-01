import * as React from "react";
import { ColumnsIcon, RowsIcon } from "@radix-ui/react-icons";
import { twMerge } from "tailwind-merge";
import { get } from "lodash";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerChaiBlock } from "@/sdk/next/server";
import { Numeric, Styles } from "@/sdk/package/controls/controls";
import { cn } from "@/lib/utils";

const RowBlock = (props: TBlock & { blockProps: Record<string, string>; _styles: Record<string, string> }) => {
  const { blockProps, children, _styles } = props;
  const className = twMerge(get(_styles, "className", ""), "grid grid-cols-12");
  return React.createElement("div", { ...blockProps, ..._styles, className }, children);
};

registerChaiBlock(RowBlock, {
  type: "Row",
  label: "Row",
  icon: RowsIcon,
  category: "core",
  group: "layout",
  hidden: true,
  props: {
    _styles: Styles({ default: "grid grid-cols-12" }),
  },
  blocks: [
    { _type: "Row", _id: "a", styles: "#styles:," },
    { _type: "Column", _id: "b", _parent: "a", colSpan: "6", styles: "#styles:," },
    { _type: "Column", _id: "c", _parent: "a", colSpan: "6", styles: "#styles:," },
  ],
});

const ColumnBlock = (props: TBlock & { blockProps: Record<string, string>; _styles: Record<string, string> }) => {
  const { blockProps, _styles, _colSpan, children } = props;

  let emptySlot: React.ReactNode | null = null;
  if (!children) {
    emptySlot = (
      <div className={cn("flex h-20 flex-col items-center justify-center", _styles?.className)}>
        <div className="h-full w-full rounded-md border-4 border-dashed" />
      </div>
    );
  }

  const cols: { [key: number | string]: string } = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    7: "col-span-7",
    8: "col-span-8",
    9: "col-span-9",
    10: "col-span-10",
    11: "col-span-11",
    12: "col-span-12",
  };
  const className = twMerge(get(_styles, "className", ""), cols[_colSpan]);
  return React.createElement("div", { ..._styles, ...blockProps, droppable: "yes", className }, children || emptySlot);
};

registerChaiBlock(ColumnBlock, {
  type: "Column",
  label: "Column",
  icon: ColumnsIcon,
  category: "core",
  group: "layout",
  hidden: true,
  props: {
    _styles: Styles({ default: "" }),
    _colSpan: Numeric({ title: "Columns", default: 6, minimum: 1, maximum: 12 }),
  },
});
