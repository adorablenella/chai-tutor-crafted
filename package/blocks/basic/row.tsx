import * as React from "react";
import { ColumnsIcon, RowsIcon } from "@radix-ui/react-icons";
import { twMerge } from "tailwind-merge";
import { get } from "lodash";
import { TBlock } from "../../types/TBlock";
import { registerInternalBlock } from "../../controls";
import { Numeric, Styles } from "../../controls/controls";
import { cn } from "../../radix/lib/utils";

const RowBlock = (props: TBlock & { styles: any }) => {
  const { blockProps, children, styles } = props;
  const className = twMerge(get(styles, "className", ""), "grid grid-cols-12");
  return React.createElement("div", { ...blockProps, ...styles, className }, children);
};

registerInternalBlock(RowBlock, {
  type: "Row",
  label: "Row",
  icon: RowsIcon,
  category: "core",
  group: "layout",
  props: {
    styles: Styles({ default: "grid grid-cols-12" }),
  },
  blocks: [
    { _type: "Row", _id: "a", _parent: null, styles: "#styles:," },
    { _type: "Column", _id: "b", _parent: "a", colSpan: 6, styles: "#styles:," },
    { _type: "Column", _id: "c", _parent: "a", colSpan: 6, styles: "#styles:," },
  ],
});

const ColumnBlock = (props: TBlock & { styles: any }) => {
  const { blockProps, styles, colSpan, children } = props;
  let emptySlot: React.ReactNode | null = null;
  if (!children) {
    emptySlot = (
      <div className={cn("h-20 flex flex-col items-center justify-center", props.styles.className)}>
        <div className="border-dashed border-4 w-full h-full rounded-md" />
      </div>
    );
  }
  const cols: { [key: number]: string } = {
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
  const className = twMerge(get(styles, "className", ""), cols[colSpan]);
  return React.createElement("div", { ...styles, ...blockProps, droppable: "yes", className }, children || emptySlot);
};

registerInternalBlock(ColumnBlock, {
  type: "Column",
  label: "Column",
  icon: ColumnsIcon,
  category: "core",
  group: "layout",
  props: {
    styles: Styles({ default: "" }),
    colSpan: Numeric({ title: "Columns", default: 6, minimum: 1, maximum: 12 }),
  },
});
