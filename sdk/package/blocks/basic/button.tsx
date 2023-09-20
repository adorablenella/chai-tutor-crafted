import * as React from "react";
import { ButtonIcon } from "@radix-ui/react-icons";
import { useBlockContentByLanguage } from "../../hooks";
import { registerInternalBlock } from "../../controls";
import { Icon, Link, SelectOption, SingleLineText, Styles } from "../../controls/controls";
import { TBlock } from "../../types/TBlock";

const ButtonBlock = (block: TBlock) => {
  const { blockProps, icon, iconPos, styles } = block;
  const { content: label } = useBlockContentByLanguage("label", block);
  const child = (
    <>
      {label}
      {icon && <span className={iconPos} dangerouslySetInnerHTML={{ __html: icon }} />}
    </>
  );
  // eslint-disable-next-line react/button-has-type
  return React.createElement("button", { ...blockProps, ...styles, type: "button" }, child);
};

registerInternalBlock(ButtonBlock as React.FC<any>, {
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
