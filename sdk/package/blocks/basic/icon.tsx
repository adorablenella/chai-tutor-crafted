import * as React from "react";
import { SketchLogoIcon } from "@radix-ui/react-icons";
import { registerInternalBlock } from "../../controls";
import { Icon, Styles } from "../../controls/controls";
import { TBlock } from "../../types/TBlock";

const IconBlock = (block: TBlock) => {
  const { blockProps, icon, styles } = block;
  return React.createElement("div", { ...blockProps, ...styles, dangerouslySetInnerHTML: { __html: icon } });
};

registerInternalBlock(IconBlock as React.FC<any>, {
  type: "Icon",
  label: "Icon",
  category: "core",
  icon: SketchLogoIcon,
  group: "basic",
  props: {
    styles: Styles({ default: "text-black" }),
    icon: Icon({
      title: "Icon",
      default: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zM8 1.5c3.59 0 6.5 2.91 6.5 6.5s-2.91 6.5-6.5 6.5-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5zM8 9.356c1.812 0 3.535-0.481 5-1.327-0.228 2.788-2.393 4.971-5 4.971s-4.772-2.186-5-4.973c1.465 0.845 3.188 1.329 5 1.329zM4 5.5c0-0.828 0.448-1.5 1-1.5s1 0.672 1 1.5c0 0.828-0.448 1.5-1 1.5s-1-0.672-1-1.5zM10 5.5c0-0.828 0.448-1.5 1-1.5s1 0.672 1 1.5c0 0.828-0.448 1.5-1 1.5s-1-0.672-1-1.5z"></path></svg>`,
    }),
  },
});