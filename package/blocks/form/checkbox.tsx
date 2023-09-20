import * as React from "react";
import { CheckboxIcon } from "@radix-ui/react-icons";
import { registerInternalBlock } from "../../controls";
import { Checkbox, SingleLineText, Styles } from "../../controls/controls";
import { TBlock } from "../../types/TBlock";
import { generateUUID } from "../../functions/functions";

const CheckboxBlock = (block: TBlock) => {
  const { blockProps, label, styles, inputStyles } = block;
  const fieldId = generateUUID();
  return (
    <div {...styles} {...blockProps}>
      <input {...inputStyles} id={fieldId} type="checkbox" required={block.required} checked={block.checked} />
      <label htmlFor={fieldId}>{label}</label>
    </div>
  );
};

registerInternalBlock(CheckboxBlock as React.FC<any>, {
  type: "Checkbox",
  label: "Checkbox",
  category: "core",
  icon: CheckboxIcon,
  group: "form",
  props: {
    styles: Styles({ default: "flex items-center gap-x-2" }),
    label: SingleLineText({ title: "Label", default: "Label" }),
    checked: Checkbox({ title: "Checked", default: false }),
    required: Checkbox({ title: "Required", default: false }),
  },
});
