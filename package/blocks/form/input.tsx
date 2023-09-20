import * as React from "react";
import { InputIcon } from "@radix-ui/react-icons";
import { map } from "lodash";
import { registerInternalBlock } from "../../controls";
import { Checkbox, SingleLineText, SelectOption, Styles } from "../../controls/controls";
import { TBlock } from "../../types/TBlock";
import { generateUUID } from "../../functions/functions";

const InputBlock = (block: TBlock) => {
  const { blockProps, type, label, placeholder, styles, inputStyles } = block;
  const fieldId = generateUUID();
  return (
    <div {...styles} {...blockProps}>
      <label htmlFor={fieldId}>{label}</label>
      <input {...inputStyles} id={fieldId} type={type} placeholder={placeholder} />
    </div>
  );
};

registerInternalBlock(InputBlock as React.FC<any>, {
  type: "Input",
  label: "Input",
  category: "core",
  icon: InputIcon,
  group: "form",
  props: {
    showLabel: Checkbox({ title: "Show label", default: true }),
    styles: Styles({ default: "" }),
    inputStyles: Styles({ default: "w-full p-1" }),
    label: SingleLineText({ title: "Label", default: "Label" }),
    placeholder: SingleLineText({ title: "Placeholder", default: "Placeholder" }),
    inputType: SelectOption({
      title: "Type",
      options: map(["text", "email", "password", "number"], (type) => ({ value: type, title: type })),
      default: "text",
    }),
  },
});
