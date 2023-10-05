import * as React from "react";
import { isEmpty, omit } from "lodash";
import { Link1Icon } from "@radix-ui/react-icons";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerServerBlock } from "@/sdk/next/server";
import { Link, Styles } from "@/sdk/package/controls/controls";

const LinkBlock = (
  props: TBlock & { styles: any; link: any; blockProps: Record<string, string>; children: React.ReactNode },
) => {
  const { blockProps, link, children, styles } = props;
  let emptySlot: React.ReactNode | null = null;
  if (!children && isEmpty(styles.className)) {
    emptySlot = (
      <div {...omit(styles, ["className"])} className="border-1 flex h-20 items-center justify-center border-dashed">
        + Add blocks here
      </div>
    );
  }
  return (
    <a href={link.href || "#/"} target={link.target} {...blockProps} {...styles}>
      {children || emptySlot}
    </a>
  );
};

registerServerBlock(LinkBlock, {
  type: "Link",
  label: "Link",
  category: "core",
  icon: Link1Icon,
  group: "basic",
  props: {
    styles: Styles({ default: "" }),
    link: Link({ title: "Link", default: { type: "page", target: "_self", href: "" } }),
  },
});
