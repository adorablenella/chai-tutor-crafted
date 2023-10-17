import * as React from "react";
import { ColumnsIcon, RowsIcon } from "@radix-ui/react-icons";
import { get } from "lodash";
import { twMerge } from "tailwind-merge";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerChaiBlock } from "@/sdk/next/server";
import { RichText, SelectOption, Styles } from "@/sdk/package/controls/controls";

const ListBlock = (props: TBlock & { blockProps: Record<string, string>; _styles: Record<string, string> }) => {
  const { blockProps, children, _listType, _styles, _tag, ...rest } = props;
  const className = twMerge(get(_styles, "className", ""), _listType);

  return React.createElement(
    _tag ? _tag : _listType === "list-decimal" ? "ol" : "ul",
    { ...blockProps, ..._styles, className },
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
    { _type: "List", _id: "a", listType: "list-none", styles: "#styles:," },
    { _type: "ListItem", _id: "b", _parent: "a", styles: "#styles:," },
    { _type: "ListItem", _id: "c", _parent: "a", styles: "#styles:," },
    { _type: "ListItem", _id: "d", _parent: "a", styles: "#styles:," },
  ],
});

const ListItemBlock = (
  props: TBlock & { _content: string; blockProps: Record<string, string>; _styles: Record<string, string> },
) => {
  const { blockProps, _content, _styles, children, _tag } = props;
  if (!children) {
    return React.createElement(_tag || "li", {
      ..._styles,
      ...blockProps,
      dangerouslySetInnerHTML: { __html: _content },
    });
  }
  return React.createElement(_tag || "li", { ..._styles, ...blockProps }, children);
};

registerChaiBlock(ListItemBlock, {
  type: "ListItem",
  label: "List Item",
  icon: ColumnsIcon,
  category: "core",
  group: "basic",
  props: {
    _styles: Styles({ default: "" }),
    _content: RichText({ title: "Content", default: "List item" }),
  },
});
