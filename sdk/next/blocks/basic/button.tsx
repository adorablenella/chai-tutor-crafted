import * as React from "react";
import { ButtonIcon } from "@radix-ui/react-icons";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerServerBlock } from "@/sdk/next/server";
import { Icon, Link, SelectOption, SingleLineText, Styles } from "@/sdk/package/controls/controls";

const ButtonBlock = (block: TBlock & { blockProps: Record<string, string>; styles: Record<string, string> }) => {
  const { blockProps, icon, content, iconPos, styles } = block;
  const child = (
    <>
      {content}
      {icon && <span className={iconPos || ""} dangerouslySetInnerHTML={{ __html: icon }} />}
    </>
  );
  // eslint-disable-next-line react/button-has-type
  return React.createElement("button", { ...blockProps, ...styles, type: "button" }, child);
};

registerServerBlock(ButtonBlock as React.FC<any>, {
  type: "Button",
  label: "Button",
  category: "core",
  icon: ButtonIcon,
  group: "basic",
  props: {
    label: SingleLineText({ title: "Label", default: "Button", multiLingual: true }),
    styles: Styles({ default: "text-white bg-primary px-4 py-2 rounded-global flex items-center" }),
    link: Link({ title: "Link", default: { type: "page", href: "", target: "_blank" } }),
    icon: Icon({ title: "Icon", default: "" }),
    iconPos: SelectOption({
      title: "Icon Position",
      default: "order-last",
      options: [
        { title: "Start", value: "order-first" },
        { title: "End", value: "order-last" },
      ],
    }),
  },
});
