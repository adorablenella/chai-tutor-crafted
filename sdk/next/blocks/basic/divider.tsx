import * as React from "react";
import { DividerHorizontalIcon } from "@radix-ui/react-icons";
import { registerServerBlock } from "@/sdk/next/server";
import { Styles } from "@/sdk/package/controls/controls";
import { TBlock } from "@/sdk/package/types/TBlock";

/**
 * Divider component
 * @param props
 * @constructor
 */
const DividerBlock = (props: TBlock & { blockProps: Record<string, string>; styles: Record<string, string> }) => {
  const { blockProps, styles } = props;
  return React.createElement("hr", { ...styles, ...blockProps });
};

registerServerBlock(DividerBlock as React.FC<any>, {
  type: "Divider",
  label: "Divider",
  category: "core",
  icon: DividerHorizontalIcon,
  group: "basic",
  props: {
    styles: Styles({ default: "bg-gray-900 h-0.5 my-1" }),
  },
});
