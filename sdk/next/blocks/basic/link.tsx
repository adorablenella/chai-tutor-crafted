import * as React from "react";
import { isEmpty, omit } from "lodash";
import { Link1Icon } from "@radix-ui/react-icons";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerServerBlock } from "@/sdk/next/server";
import { Link, Styles } from "@/sdk/package/controls/controls";

const LinkBlock = (
  props: TBlock & {
    _styles: any;
    _link: any;
    inBuilder: boolean;
    blockProps: Record<string, string>;
    children: React.ReactNode;
  },
) => {
  const { blockProps, _link, children, _styles, inBuilder } = props;
  let emptySlot: React.ReactNode | null = null;
  if (!children && isEmpty(_styles?.className)) {
    emptySlot = (
      <div {...omit(_styles, ["className"])} className="border-1 flex h-20 items-center justify-center border-dashed">
        + Add blocks here
      </div>
    );
  }
  if (inBuilder) {
    return (
      <div data-simulate={"a"} {...blockProps} {..._styles}>
        {children || emptySlot}
      </div>
    );
  }
  return (
    <a href={_link.href || "#/"} target={_link.target} {...blockProps} {..._styles}>
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
    _styles: Styles({ default: "" }),
    _link: Link({ title: "Link", default: { type: "page", target: "_self", href: "" } }),
  },
});
