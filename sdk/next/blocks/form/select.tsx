import * as React from "react";
import { DropdownMenuIcon } from "@radix-ui/react-icons";
import { map } from "lodash";
import { TBlock } from "@/sdk/package/types/TBlock";
import { generateUUID } from "@/sdk/package/functions/functions";
import { registerServerBlock } from "@/sdk/next/server";
import { Checkbox, List, SingleLineText, Styles } from "@/sdk/package/controls/controls";

const SelectBlock = (
  block: TBlock & {
    blockProps: Record<string, string>;
    _styles: Record<string, string>;
    _inputStyles: Record<string, string>;
    _required: boolean;
    _options: { label: string; value: string }[];
  },
) => {
  const { blockProps, _label, _placeholder, _styles, _inputStyles, _required } = block;
  const fieldId = generateUUID();
  return (
    <div {..._styles} {...blockProps}>
      {block.showLabel && <label htmlFor={fieldId}>{_label}</label>}
      <select {..._inputStyles} id={fieldId} placeholder={_placeholder} required={_required}>
        <option value="" disabled selected hidden>
          {_placeholder}
        </option>
        {map(block._options, (option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

registerServerBlock(SelectBlock as React.FC<any>, {
  type: "Select",
  label: "Select",
  category: "core",
  icon: DropdownMenuIcon,
  group: "form",
  props: {
    _showLabel: Checkbox({ title: "Show label", default: true }),
    _styles: Styles({ default: "" }),
    _inputStyles: Styles({ default: "w-full p-1" }),
    _label: SingleLineText({ title: "Label", default: "Label" }),
    _placeholder: SingleLineText({ title: "Placeholder", default: "Placeholder" }),
    _required: Checkbox({ title: "Required", default: false }),
    _options: List({
      title: "Options",
      itemProperties: {
        label: SingleLineText({ title: "Label", default: "" }),
        value: SingleLineText({ title: "Value", default: "" }),
      },
    }),
  },
});
