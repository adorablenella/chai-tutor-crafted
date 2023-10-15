import * as React from "react";
import { ColumnsIcon, RowsIcon } from "@radix-ui/react-icons";
import { get } from "lodash";
import { twMerge } from "tailwind-merge";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerChaiBlock } from "@/sdk/next/server";
import { SelectOption, Styles } from "@/sdk/package/controls/controls";
import { cn } from "@/lib/utils";
import { getRestProps } from "../helper";

const ListBlock = (props: TBlock & { blockProps: Record<string, string>; _styles: Record<string, string> }) => {
  const { blockProps, children, _listType, _styles, _tag, ...rest } = props;
  const className = twMerge(get(_styles, "className", ""), _listType);

  return React.createElement(
    _tag ? _tag : _listType === "list-decimal" ? "ol" : "ul",
    { ...blockProps, ..._styles, className, ...getRestProps(rest) },
    children,
  );
};

registerChaiBlock(ListBlock, {
  type: "List",
  label: "List",
  icon: RowsIcon,
  category: "core",
  group: "basic",
  props: {
    _styles: Styles({ default: "" }),
    _listType: SelectOption({
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
    { _type: "List", _id: "a", listType: "list-disc", styles: "#styles:," },
    { _type: "ListItem", _id: "b", _parent: "a", styles: "#styles:," },
    { _type: "ListItem", _id: "c", _parent: "a", styles: "#styles:," },
    { _type: "ListItem", _id: "d", _parent: "a", styles: "#styles:," },
  ],
});

const ListItemBlock = (props: TBlock & { blockProps: Record<string, string>; _styles: Record<string, string> }) => {
  const { blockProps, _styles, children, _tag } = props;
  let emptySlot: React.ReactNode | null = null;
  if (!children) {
    emptySlot = (
      <div className={cn("flex h-20 flex-col items-center justify-center", _styles?.className)}>
        <div className="h-full w-full rounded-md border-4 border-dashed" />
      </div>
    );
  }
  return React.createElement(_tag || "li", { ..._styles, ...blockProps, droppable: "yes" }, children || emptySlot);
};

registerChaiBlock(ListItemBlock, {
  type: "ListItem",
  label: "List Item",
  icon: ColumnsIcon,
  category: "core",
  group: "basic",
  props: {
    _styles: Styles({ default: "" }),
  },
});
