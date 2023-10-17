import * as React from "react";
import { TBlock } from "@/sdk/package/types/TBlock";
import { cn } from "@/sdk/package/radix/lib/utils";
import { registerChaiBlock } from "@/sdk/next/server";
import { RichText, SelectOption, Styles } from "@/sdk/package/controls/controls";
import { getRestProps } from "../helper";
import {
  BorderAllIcon,
  BorderTopIcon,
  DragHandleHorizontalIcon,
  TableIcon,
  ViewHorizontalIcon,
} from "@radix-ui/react-icons";
import { generateUUID } from "@/sdk/package/functions/functions";

const getDefaultBlocks = (type: string): TBlock[] => {
  if (type === "TableRow") {
    const parentId = generateUUID();
    return [
      { _type: "TableRow", _id: parentId, listType: "list-none", styles: "#styles:," },
      { _type: "TableCell", _id: "b", _parent: parentId, styles: "#styles:," },
      { _type: "TableCell", _id: "c", _parent: parentId, styles: "#styles:," },
      { _type: "TableCell", _id: "d", _parent: parentId, styles: "#styles:," },
    ];
  }
  return [];
};

const TableBlock = (
  props: TBlock & { children: React.ReactNode; _styles: any; tag: string; blockProps: Record<string, string> },
) => {
  const { blockProps, children, _tag = "div", _styles, ...rest } = props;
  return React.createElement("table", { ...blockProps, ..._styles, ...getRestProps(rest) }, children);
};

registerChaiBlock(TableBlock, {
  type: "Table",
  label: "Table",
  category: "core",
  group: "table",
  icon: TableIcon,
  props: {
    _styles: Styles({ default: "" }),
  },
});

const TableHeadBlock = (
  props: TBlock & { children: React.ReactNode; _styles: any; tag: string; blockProps: Record<string, string> },
) => {
  const { blockProps, children, _tag = "div", _styles, ...rest } = props;
  return React.createElement("thead", { ...blockProps, ..._styles, ...getRestProps(rest) }, children);
};

registerChaiBlock(TableHeadBlock, {
  type: "TableHead",
  label: "Table Head",
  category: "core",
  group: "table",
  icon: BorderTopIcon,
  props: {
    _styles: Styles({ default: "" }),
  },
});

const TableBodyBlock = (
  props: TBlock & { children: React.ReactNode; _styles: any; tag: string; blockProps: Record<string, string> },
) => {
  const { blockProps, children, _tag = "div", _styles, ...rest } = props;
  return React.createElement("tbody", { ...blockProps, ..._styles, ...getRestProps(rest) }, children);
};

registerChaiBlock(TableBodyBlock, {
  type: "TableBody",
  label: "Table Body",
  category: "core",
  group: "table",
  icon: BorderAllIcon,
  props: {
    _styles: Styles({ default: "" }),
  },
});

const TableRowBlock = (
  props: TBlock & { children: React.ReactNode; _styles: any; tag: string; blockProps: Record<string, string> },
) => {
  const { blockProps, children, _tag = "div", _styles, ...rest } = props;
  return React.createElement("tr", { ...blockProps, ..._styles, ...getRestProps(rest) }, children);
};

registerChaiBlock(TableRowBlock, {
  type: "TableRow",
  label: "Table Row",
  category: "core",
  group: "table",
  icon: ViewHorizontalIcon,
  props: {
    _styles: Styles({ default: "" }),
  },
  blocks: getDefaultBlocks("TableRow"),
});

const TableCellBlock = (
  props: TBlock & { children: React.ReactNode; _styles: any; tag: string; blockProps: Record<string, string> },
) => {
  const { blockProps, children, _content, _styles, ...rest } = props;

  if (!children) {
    return React.createElement("td", {
      ...blockProps,
      ..._styles,
      ...getRestProps(rest),
      dangerouslySetInnerHTML: { __html: _content },
    });
  }
  return React.createElement("td", { ...blockProps, ..._styles, ...getRestProps(rest) }, children);
};

registerChaiBlock(TableCellBlock, {
  type: "TableCell",
  label: "Table Cell",
  category: "core",
  group: "table",
  icon: DragHandleHorizontalIcon,
  props: {
    _styles: Styles({ default: "" }),
    _content: RichText({ title: "Content", default: "Table cell item" }),
  },
});
