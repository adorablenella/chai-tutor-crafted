import * as React from "react";
import { isEmpty, omit } from "lodash";
import { Link1Icon } from "@radix-ui/react-icons";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerChaiBlock } from "@/sdk/next/server";
import { Link, SingleLineText, Styles } from "@/sdk/package/controls/controls";
import { getRestProps } from "../helper";

const LinkBlock = (
  props: TBlock & {
    _styles: any;
    _link: any;
    inBuilder: boolean;
    blockProps: Record<string, string>;
    children: React.ReactNode;
  },
) => {
  const { blockProps, _link, children, _styles, inBuilder, _content, ...rest } = props;
  const restProps = getRestProps(rest);

  let emptySlot: React.ReactNode | null = null;
  if (!children && isEmpty(_styles?.className) && isEmpty(_content)) {
    emptySlot = (
      <div {...omit(_styles, ["className"])} className="border-1 flex h-20 items-center justify-center border-dashed">
        + Add blocks here
      </div>
    );
  }

  if (inBuilder) {
    if (children || emptySlot) {
      return (
        <span data-simulate={"a"} {...blockProps} {..._styles} {...restProps}>
          {children || emptySlot}
        </span>
      );
    } else {
      return React.createElement("span", {
        ...blockProps,
        ..._styles,
        href: _link.href || "#",
        target: _link.target || "_self",
        dangerouslySetInnerHTML: { __html: _content },
        "data-simulate": "a",
        ...restProps,
      });
    }
  }

  if (children || emptySlot) {
    return (
      <a href={_link.href || "#/"} target={_link.target} {...blockProps} {..._styles} {...restProps}>
        {children || emptySlot}
      </a>
    );
  }

  return React.createElement("a", {
    ...blockProps,
    ..._styles,
    href: _link.href || "#",
    target: _link.target || "_self",
    ...restProps,
    dangerouslySetInnerHTML: { __html: _content },
  });
};

registerChaiBlock(LinkBlock, {
  type: "Link",
  label: "Link",
  category: "core",
  icon: Link1Icon,
  group: "basic",
  props: {
    _styles: Styles({ default: "" }),
    _content: SingleLineText({ title: "Content", default: "" }),
    _link: Link({ title: "Link", default: { type: "page", target: "_self", href: "" } }),
  },
});
