import * as React from "react";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerChaiBlock } from "@/sdk/next/server";
import { Styles } from "@/sdk/package/controls/controls";
import { SpaceBetweenVerticallyIcon } from "@radix-ui/react-icons";

const LineBreakComponent = (props: TBlock & { _styles: any; blockProps: Record<string, string> }) => {
  const { blockProps, _styles, _attrs = {} } = props;
  return React.createElement("br", { ...blockProps, ..._styles, ..._attrs });
};

registerChaiBlock(LineBreakComponent, {
  type: "LineBreak",
  label: "Line Break",
  category: "core",
  group: "basic",
  icon: SpaceBetweenVerticallyIcon,
  props: {
    _styles: Styles({ default: "" }),
  },
});
