import * as React from "react";
import { ButtonIcon } from "@radix-ui/react-icons";
import { registerInternalBlock } from "../../controls";
import { SingleLineText, Styles, Icon, SelectOption } from "../../controls/controls";
import { TBlock } from "../../types/TBlock";
import { generateUUID } from "../../functions/functions";
import { useBlockContentByLanguage } from "../../hooks";

const FormButtonBlock = (block: TBlock) => {
  const { blockProps, placeholder, styles, inputStyles, icon, iconPos } = block;
  const { content: label } = useBlockContentByLanguage("label", block);
  const fieldId = generateUUID();
  return (
    <button {...inputStyles} {...styles} {...(blockProps || {})} id={fieldId} type="submit" placeholder={placeholder}>
      {label}
      {icon && <span className={iconPos} dangerouslySetInnerHTML={{ __html: icon }} />}
    </button>
  );
};

registerInternalBlock(FormButtonBlock as React.FC<any>, {
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
