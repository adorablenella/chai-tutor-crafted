import * as React from "react";
import { isEmpty, omit } from "lodash";
import { Link1Icon } from "@radix-ui/react-icons";
import { TBlock } from "../../types/TBlock";
import { registerInternalBlock } from "../../controls";
import { Link, Styles } from "../../controls/controls";

const LinkBlock = (props: TBlock & { children: React.ReactNode }) => {
  const { blockProps, link, children, styles } = props;
  let emptySlot: React.ReactNode | null = null;
  if (!children && isEmpty(styles.className)) {
    emptySlot = (
      <div {...omit(styles, ["className"])} className="h-20 border-dashed border-1 flex items-center justify-center">
        + Add blocks here
      </div>
    );
  }
  return (
    <a href={link.href} target={link.target} {...blockProps} {...styles}>
      {children || emptySlot}
    </a>
  );
};

registerInternalBlock(LinkBlock, {
  type: "Link",
  label: "Link",
  category: "core",
  icon: Link1Icon,
  group: "basic",
  props: {
    styles: Styles({ default: "" }),
    link: Link({ title: "Link", default: { type: "page", target: "_self", href: "#sdd" } }),
  },
});
