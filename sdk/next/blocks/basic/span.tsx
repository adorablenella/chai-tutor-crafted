import * as React from "react";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerChaiBlock } from "@/sdk/next/server";
import { RichText, Styles } from "@/sdk/package/controls/controls";
import { getRestProps } from "../helper";

const SpanBlock = (props: TBlock & { children: React.ReactNode; _styles: any; blockProps: Record<string, string> }) => {
  const { blockProps, _styles, _content, children = null, _tag, ...rest } = props;
  const restProps = getRestProps(rest);

  if (children) return React.createElement("span", { ..._styles, ...blockProps, ...restProps }, children);

  return React.createElement(_tag || "span", {
    ..._styles,
    ...blockProps,
    ...restProps,
    dangerouslySetInnerHTML: { __html: _content },
  });
};

registerChaiBlock(SpanBlock, {
  type: "Span",
  label: "Span",
  category: "core",
  group: "basic",
  props: {
    _styles: Styles({ default: "" }),
    _content: RichText({ title: "Content", default: "Your text" }),
  },
});
