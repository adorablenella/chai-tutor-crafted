import * as React from "react";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerServerBlock } from "@/sdk/next/server";
import { Styles } from "@/sdk/package/controls/controls";
import { SpaceBetweenVerticallyIcon } from "@radix-ui/react-icons";

const LineBreakComponent = (props: TBlock & { styles: any; blockProps: Record<string, string> }) => {
  const { blockProps, styles } = props;
  return React.createElement("br", { ...blockProps, ...styles });
};

registerServerBlock(LineBreakComponent, {
  type: "LineBreak",
  label: "Line Break",
  category: "core",
  group: "basic",
  icon: SpaceBetweenVerticallyIcon,
  props: {
    styles: Styles({ default: "" }),
  },
});
