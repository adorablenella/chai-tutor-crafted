import * as React from "react";
import { HeadingIcon } from "@radix-ui/react-icons";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerServerBlock } from "@/sdk/next/server";
import { MultilineText, SelectOption, Styles } from "@/sdk/package/controls/controls";

/**
 * Heading component
 * @param props
 * @constructor
 */
const HeadingBlock = (
  props: TBlock & { level: string; blockProps: Record<string, string>; styles: Record<string, string> },
) => {
  const { blockProps, styles, content, level = "h1" } = props;
  // eslint-disable-next-line react/no-danger
  return React.createElement(level, { ...styles, ...blockProps, dangerouslySetInnerHTML: { __html: content } });
};

registerServerBlock(HeadingBlock as React.FC<any>, {
  type: "Heading",
  label: "Heading",
  category: "core",
  icon: HeadingIcon,
  group: "basic",
  props: {
    level: SelectOption({
      title: "Level",
      default: "h1",
      options: [
        { value: "h1", title: "h1" },
        { value: "h2", title: "h2" },
        { value: "h3", title: "h3" },
        { value: "h4", title: "h4" },
        { value: "h5", title: "h5" },
        { value: "h6", title: "h6" },
      ],
    }),
    styles: Styles({ default: "text-3xl" }),
    content: MultilineText({ title: "Content", default: "Heading goes here", rows: 3, multiLingual: true }),
  },
});
