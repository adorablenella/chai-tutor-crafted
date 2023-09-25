import * as React from "react";
import { InputIcon } from "@radix-ui/react-icons";
import { registerInternalBlock } from "../../controls";
import { Checkbox, Numeric, SingleLineText, Styles } from "../../controls/controls";
import { TBlock } from "../../types/TBlock";
import { generateUUID } from "../../functions/functions";

const InputBlock = (
  block: TBlock & {
    blockProps: Record<string, string>;
    styles: Record<string, string>;
    inputStyles: Record<string, string>;
    required: boolean;
    options: { label: string; value: string }[];
  },
) => {
  const { blockProps, label, placeholder, styles, inputStyles } = block;
  const fieldId = generateUUID();
  return (
    <div {...styles} {...blockProps}>
      <label htmlFor={fieldId}>{label}</label>
      <textarea {...inputStyles} id={fieldId} placeholder={placeholder} />
    </div>
  );
};

registerInternalBlock(InputBlock as React.FC<any>, {
  type: "TextArea",
  label: "TextArea",
  category: "core",
  icon: InputIcon,
  group: "form",
  props: {
    showLabel: Checkbox({ title: "Show label", default: true }),
    styles: Styles({ default: "" }),
    inputStyles: Styles({ default: "w-full p-1" }),
    label: SingleLineText({ title: "Label", default: "Label" }),
    placeholder: SingleLineText({ title: "Placeholder", default: "Placeholder" }),
    rows: Numeric({ title: "Rows", default: 3 }),
  },
});
