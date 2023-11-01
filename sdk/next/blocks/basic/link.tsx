import * as React from "react";
import { isEmpty, omit } from "lodash";
import { Link1Icon } from "@radix-ui/react-icons";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerChaiBlock } from "@/sdk/next/server";
import { Link, SingleLineText, Styles } from "@/sdk/package/controls/controls";
import EmptySlot from "../helper-components/empty-slot";

const LinkBlock = (
  props: TBlock & {
    _styles: any;
    _link: any;
    inBuilder: boolean;
    blockProps: Record<string, string>;
    children: React.ReactNode;
  },
) => {
  const { blockProps, _link, children, _styles, inBuilder, _content } = props;

  if (!children && isEmpty(_styles?.className) && isEmpty(_content)) {
    return <EmptySlot blockProps={blockProps} />;
  }

  if (inBuilder) {
    if (children) {
      return (
        <span data-simulate={"a"} {...blockProps} {..._styles}>
          {children}
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
      });
    }
  }

  if (children) {
    return (
      <a href={_link.href || "#/"} target={_link.target} {...blockProps} {..._styles}>
        {children}
      </a>
    );
  }

  return React.createElement("a", {
    ...blockProps,
    ..._styles,
    href: _link.href || "#",
    target: _link.target || "_self",
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
