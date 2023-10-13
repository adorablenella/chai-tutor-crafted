import * as React from "react";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerChaiBlock } from "@/sdk/next/server";
import { MultilineText, Styles } from "@/sdk/package/controls/controls";

const SpanBlock = (props: TBlock & { children: React.ReactNode; _styles: any; blockProps: Record<string, string> }) => {
  const { blockProps, _styles, _content, children = null } = props;
  if (children) return React.createElement("div", { ..._styles, ...blockProps }, children);
  return React.createElement("div", { ..._styles, ...blockProps, dangerouslySetInnerHTML: { __html: _content } });
};

registerChaiBlock(SpanBlock, {
  type: "Span",
  label: "Span",
  category: "core",
  group: "basic",
  props: {
    _styles: Styles({ default: "" }),
    _content: MultilineText({ title: "Content", default: "Span content" }),
  },
});
