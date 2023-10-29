import * as React from "react";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerChaiBlock } from "@/sdk/next/server";
import { RichText, Styles } from "@/sdk/package/controls/controls";
import {
  BorderAllIcon,
  BorderTopIcon,
  DragHandleHorizontalIcon,
  TableIcon,
  ViewHorizontalIcon,
} from "@radix-ui/react-icons";
import { generateUUID } from "@/sdk/package/functions/functions";
import { isEmpty } from "lodash";
import EmptySlot from "../helper-components/empty-slot";

const getDefaultBlocks = (type: string): TBlock[] => {
  const td = (id: string, content: string) => ({
    _id: generateUUID(),
    _parent: id,
    _type: "TableCell",
    _styles: "#styles:,",
    _content: `${type === "TableHead" ? "Table Head" : "Table Cell " + content}`,
  });

  const tr = (id?: string) => {
    const trId = generateUUID();
    const rootBlock: any = { _type: "TableRow", _id: trId, _styles: "#styles:,border-b" };
    if (id) rootBlock._parent = id;
    return [rootBlock, td(trId, "1"), td(trId, "2"), td(trId, "3")];
  };

  const thead = (id?: string) => {
    const theadId = generateUUID();
    const rootBlock: any = { _id: theadId, _type: "TableHead", _styles: "#styles:,font-medium" };
    if (id) rootBlock._parent = id;
    return [rootBlock, ...tr(theadId)];
  };

  const tbody = (id?: string) => {
    const tbodyId = generateUUID();
    const rootBlock: any = { _id: tbodyId, _type: "TableBody", _styles: "#styles:," };
    if (id) rootBlock._parent = id;
    return [rootBlock, ...tr(tbodyId), ...tr(tbodyId)];
  };

  if (type === "Table") {
    const tableId = generateUUID();
    return [
      {
        _id: tableId,
        _type: "Table",
        _styles: "#styles:,w-full text-left text-gray-500 dark:text-gray-400",
      },
      ...thead(tableId),
      ...tbody(tableId),
    ];
  }

  if (type === "TableRow") return tr();
  if (type === "TableHead") return thead();
  if (type === "TableBody") return tbody();

  return [];
};

const TableBlock = (
  props: TBlock & { children: React.ReactNode; _styles: any; tag: string; blockProps: Record<string, string> },
) => {
  const { blockProps, children, _styles, _attrs = {} } = props;
  if (!children) {
    return <EmptySlot blockProps={blockProps} text="TABLE HEAD / BODY" />;
  }
  return React.createElement("table", { ...blockProps, ..._styles, ..._attrs }, children);
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
  blocks: getDefaultBlocks("Table"),
});

const TableHeadBlock = (
  props: TBlock & { children: React.ReactNode; _styles: any; tag: string; blockProps: Record<string, string> },
) => {
  const { blockProps, children, _styles, _attrs = {} } = props;
  if (!children) {
    return <EmptySlot blockProps={blockProps} text="TABLE ROW" />;
  }
  return React.createElement("thead", { ...blockProps, ..._styles, ..._attrs }, children);
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
  blocks: getDefaultBlocks("TableHead"),
});

const TableBodyBlock = (
  props: TBlock & { children: React.ReactNode; _styles: any; tag: string; blockProps: Record<string, string> },
) => {
  const { blockProps, children, _styles, _attrs = {} } = props;
  if (!children) {
    return <EmptySlot blockProps={blockProps} text="TABLE ROW" />;
  }
  return React.createElement("tbody", { ...blockProps, ..._styles, ..._attrs }, children);
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
  blocks: getDefaultBlocks("TableBody"),
});

const TableRowBlock = (
  props: TBlock & { children: React.ReactNode; _styles: any; tag: string; blockProps: Record<string, string> },
) => {
  const { blockProps, children, _styles, _attrs = {} } = props;
  if (!children) {
    return <EmptySlot blockProps={blockProps} text="TABLE CELL" />;
  }

  return React.createElement("tr", { ...blockProps, ..._styles, ..._attrs }, children);
};

registerChaiBlock(TableRowBlock, {
  type: "TableRow",
  label: "Table Row",
  category: "core",
  group: "table",
  icon: ViewHorizontalIcon,
  props: {
    _styles: Styles({ default: "w-full" }),
  },
  blocks: getDefaultBlocks("TableRow"),
});

const TableCellBlock = (
  props: TBlock & { children: React.ReactNode; _styles: any; tag: string; blockProps: Record<string, string> },
) => {
  const { blockProps, children, _content, _styles, _attrs = {} } = props;

  if (!children && isEmpty(_content)) {
    return <EmptySlot blockProps={blockProps} />;
  }

  if (!children) {
    return React.createElement("td", {
      ...blockProps,
      ..._styles,
      ..._attrs,
      dangerouslySetInnerHTML: { __html: _content },
    });
  }
  return React.createElement("td", { ...blockProps, ..._styles, ..._attrs }, children);
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
