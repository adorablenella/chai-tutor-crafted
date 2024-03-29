import * as React from "react";
import { HeadingIcon } from "@radix-ui/react-icons";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerChaiBlock } from "@/sdk/next/server";
import { RichText, SelectOption, Styles } from "@/sdk/package/controls/controls";

/**
 * Heading component
 * @param props
 * @constructor
 */
const HeadingBlock = (
  props: TBlock & { _level: string; blockProps: Record<string, string>; _styles: Record<string, string> },
) => {
  const { blockProps, _styles, _content, _level = "h1", children = null } = props;

  if (children) return React.createElement(_level, { ..._styles, ...blockProps }, children);

  return React.createElement(_level, {
    ..._styles,
    ...blockProps,
    dangerouslySetInnerHTML: { __html: _content },
  });
};

registerChaiBlock(HeadingBlock as React.FC<any>, {
  type: "Heading",
  label: "Heading",
  category: "core",
  icon: HeadingIcon,
  group: "basic",
  props: {
    _level: SelectOption({
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
    _styles: Styles({ default: "text-3xl" }),
    _content: RichText({ title: "Content", default: "Heading goes here" }),
  },
});
