import * as React from "react";
import { ButtonIcon } from "@radix-ui/react-icons";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerChaiBlock } from "@/sdk/next/server";
import { Icon, Link, SelectOption, SingleLineText, Styles } from "@/sdk/package/controls/controls";
import { getRestProps } from "../helper";

const ButtonBlock = (block: TBlock & { blockProps: Record<string, string>; _styles: Record<string, string> }) => {
  const { blockProps, _icon, _content, _iconPos, _styles, children, ...rest } = block;

  const child = children || (
    <>
      {_content}
      {_icon && <span className={_iconPos || ""} dangerouslySetInnerHTML={{ __html: _icon }} />}
    </>
  );
  return React.createElement("button", { ...blockProps, ..._styles, type: "button", ...getRestProps(rest) }, child);
};

registerChaiBlock(ButtonBlock as React.FC<any>, {
  type: "Button",
  label: "Button",
  category: "core",
  icon: ButtonIcon,
  group: "basic",
  props: {
    _content: SingleLineText({ title: "Label", default: "Button", multiLingual: true }),
    _styles: Styles({ default: "text-white bg-primary px-4 py-2 rounded-global flex items-center" }),
    _link: Link({ title: "Link", default: { type: "page", href: "", target: "_blank" } }),
    _icon: Icon({ title: "Icon", default: "" }),
    _iconPos: SelectOption({
      title: "Icon Position",
      default: "order-last",
      options: [
        { title: "Start", value: "order-first" },
        { title: "End", value: "order-last" },
      ],
    }),
  },
});
