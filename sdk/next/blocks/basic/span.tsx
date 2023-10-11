import * as React from "react";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerServerBlock } from "@/sdk/next/server";
import { MultilineText, Styles } from "@/sdk/package/controls/controls";

const SpanBlock = (props: TBlock & { children: React.ReactNode; styles: any; blockProps: Record<string, string> }) => {
  const { blockProps, styles, content, children = null } = props;
  if (children) return React.createElement("div", { ...styles, ...blockProps }, children);
  return React.createElement("div", { ...styles, ...blockProps, dangerouslySetInnerHTML: { __html: content } });
};

registerServerBlock(SpanBlock, {
  type: "Span",
  label: "Span",
  category: "core",
  group: "basic",
  props: {
    styles: Styles({ default: "" }),
    content: MultilineText({ title: "Content", default: "Span content" }),
  },
});
