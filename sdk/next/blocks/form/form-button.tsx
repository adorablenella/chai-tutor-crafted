import * as React from "react";
import { ButtonIcon } from "@radix-ui/react-icons";
import { TBlock } from "@/sdk/package/types/TBlock";
import { generateUUID } from "@/sdk/package/functions/functions";
import { registerServerBlock } from "@/sdk/next/server";
import { Icon, SelectOption, SingleLineText, Styles } from "@/sdk/package/controls/controls";

const FormButtonBlock = (
  block: TBlock & {
    blockProps: Record<string, string>;
    styles: Record<string, string>;
    inputStyles: Record<string, string>;
  },
) => {
  const { blockProps, content: label, placeholder, styles, inputStyles, icon, iconPos } = block;
  const fieldId = generateUUID();
  return (
    <button {...inputStyles} {...styles} {...(blockProps || {})} id={fieldId} type="submit" placeholder={placeholder}>
      {label}
      {icon && <span className={iconPos} dangerouslySetInnerHTML={{ __html: icon }} />}
    </button>
  );
};

registerServerBlock(FormButtonBlock as React.FC<any>, {
  type: "FormButton",
  label: "FormButton",
  category: "core",
  icon: ButtonIcon,
  group: "form",
  props: {
    label: SingleLineText({ title: "Label", default: "Submit" }),
    styles: Styles({ default: "text-white bg-primary px-4 py-2 rounded-global flex items-center gap-x-2" }),
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
