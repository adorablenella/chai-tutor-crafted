import * as React from "react";
import { CodeIcon } from "@radix-ui/react-icons";
import { registerServerBlock } from "@/sdk/next/server";
import { MultilineText, Styles } from "@/sdk/package/controls/controls";
import { TBlock } from "@/sdk/package/types/TBlock";

const CustomHTMLBlock = (props: TBlock & { blockProps: Record<string, string>; styles: Record<string, string> }) => {
  const { blockProps, styles, content } = props;
  return React.createElement("div", { ...styles, ...blockProps, dangerouslySetInnerHTML: { __html: content } });
};

registerServerBlock(CustomHTMLBlock as React.FC<any>, {
  type: "CustomHTML",
  label: "CustomHTML",
  category: "core",
  icon: CodeIcon,
  group: "basic",
  props: {
    styles: Styles({ default: "" }),
    content: MultilineText({ title: "Content", default: "" }),
  },
});
