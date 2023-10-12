import * as React from "react";
import { DividerHorizontalIcon } from "@radix-ui/react-icons";
import { registerServerBlock } from "@/sdk/next/server";
import { MultilineText, Styles } from "@/sdk/package/controls/controls";
import { TBlock } from "@/sdk/package/types/TBlock";
import { isEmpty } from "lodash";

/**
 * Divider component
 * @param props
 * @constructor
 */
const DividerBlock = (props: TBlock & { blockProps: Record<string, string>; _styles: Record<string, string> }) => {
  const { blockProps, _styles, _content } = props;
  if (!isEmpty(_content)) {
    return (
      <div {...blockProps} className="inline-flex w-full items-center justify-center">
        <hr {..._styles} />
        <span
          dangerouslySetInnerHTML={{ __html: _content }}
          className="absolute left-1/2 -translate-x-1/2 bg-white px-3 font-medium text-gray-900 dark:bg-gray-900 dark:text-white"></span>
      </div>
    );
  }
  return React.createElement("hr", { ..._styles, ...blockProps });
};

registerServerBlock(DividerBlock as React.FC<any>, {
  type: "Divider",
  label: "Divider",
  category: "core",
  icon: DividerHorizontalIcon,
  group: "basic",
  props: {
    _styles: Styles({ default: "bg-gray-900 h-0.5 py-2 my-1" }),
    _content: MultilineText({ title: "Divider label html", default: "Label" }),
  },
});
