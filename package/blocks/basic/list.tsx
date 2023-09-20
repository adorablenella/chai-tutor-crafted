import * as React from "react";
import { ColumnsIcon, RowsIcon } from "@radix-ui/react-icons";
import { get } from "lodash";
import { twMerge } from "tailwind-merge";
import { TBlock } from "../../types/TBlock";
import { registerInternalBlock } from "../../controls";
import { SelectOption, Styles } from "../../controls/controls";
import { cn } from "../../radix/lib/utils";

const ListBlock = (props: TBlock & { styles: any }) => {
  const { blockProps, children, listType, styles } = props;
  const className = twMerge(get(styles, "className", ""), listType);
  return React.createElement(
    listType === "list-decimal" ? "ol" : "ul",
    { ...blockProps, ...styles, className },
    children
  );
};

registerInternalBlock(ListBlock, {
  type: "List",
  label: "List",
  icon: RowsIcon,
  category: "core",
  group: "basic",
  props: {
    styles: Styles({ default: "" }),
    listType: SelectOption({
      title: "List type",
      default: "list-disc",
      options: [
        { value: "list-none", title: "None" },
        { value: "list-disc", title: "Disc" },
        { value: "list-decimal", title: "Number" },
      ],
    }),
  },
  blocks: [
    { _type: "List", _id: "a", _parent: null, listType: "list-disc", styles: "#styles:," },
    { _type: "ListItem", _id: "b", _parent: "a", styles: "#styles:," },
    { _type: "ListItem", _id: "c", _parent: "a", styles: "#styles:," },
    { _type: "ListItem", _id: "d", _parent: "a", styles: "#styles:," },
  ],
});

const ListItemBlock = (props: TBlock & { styles: any }) => {
  const { blockProps, styles, children } = props;
  let emptySlot: React.ReactNode | null = null;
  if (!children) {
    emptySlot = (
      <div className={cn("h-20 flex flex-col items-center justify-center", props.styles.className)}>
        <div className="border-dashed border-4 w-full h-full rounded-md" />
      </div>
    );
  }
  return React.createElement("li", { ...styles, ...blockProps, droppable: "yes" }, children || emptySlot);
};

registerInternalBlock(ListItemBlock, {
  type: "ListItem",
  label: "List Item",
  icon: ColumnsIcon,
  category: "core",
  group: "basic",
  props: {
    styles: Styles({ default: "" }),
  },
});
