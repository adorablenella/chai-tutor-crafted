import * as React from "react";
import { CodeIcon } from "@radix-ui/react-icons";
import { useBlockContentByLanguage } from "../../hooks";
import { registerInternalBlock } from "../../controls";
import { MultilineText, Styles } from "../../controls/controls";
import { TBlock } from "../../types/TBlock";

const CustomHTMLBlock = (props: TBlock & { blockProps: Record<string, string>; styles: Record<string, string> }) => {
  const { blockProps, styles } = props;
  const { content } = useBlockContentByLanguage("content", props);
  return React.createElement("div", { ...styles, ...blockProps, dangerouslySetInnerHTML: { __html: content } });
};

registerInternalBlock(CustomHTMLBlock as React.FC<any>, {
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
