import * as React from "react";
import { DropdownMenuIcon } from "@radix-ui/react-icons";
import { map } from "lodash";
import { registerInternalBlock } from "../../controls";
import { Checkbox, List, SingleLineText, Styles } from "../../controls/controls";
import { TBlock } from "../../types/TBlock";
import { generateUUID } from "../../functions/functions";

const SelectBlock = (
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
      {block.showLabel && <label htmlFor={fieldId}>{label}</label>}
      <select {...inputStyles} id={fieldId} placeholder={placeholder} required={block.required}>
        <option value="" disabled selected hidden>
          {placeholder}
        </option>
        {map(block.options, (option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

registerInternalBlock(SelectBlock as React.FC<any>, {
  type: "Select",
  label: "Select",
  category: "core",
  icon: DropdownMenuIcon,
  group: "form",
  props: {
    showLabel: Checkbox({ title: "Show label", default: true }),
    styles: Styles({ default: "" }),
    inputStyles: Styles({ default: "w-full p-1" }),
    label: SingleLineText({ title: "Label", default: "Label" }),
    placeholder: SingleLineText({ title: "Placeholder", default: "Placeholder" }),
    required: Checkbox({ title: "Required", default: false }),
    options: List({
      title: "Options",
      itemProperties: {
        label: SingleLineText({ title: "Label", default: "" }),
        value: SingleLineText({ title: "Value", default: "" }),
      },
    }),
  },
});
