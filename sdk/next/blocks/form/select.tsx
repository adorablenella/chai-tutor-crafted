import * as React from "react";
import { DropdownMenuIcon } from "@radix-ui/react-icons";
import { get, map } from "lodash";
import { TBlock } from "@/sdk/package/types/TBlock";
import { generateUUID } from "@/sdk/package/functions/functions";
import { registerChaiBlock } from "@/sdk/next/server";
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
  const {
    blockProps,
    _label,
    _placeholder,
    _styles,
    _inputStyles,
    _required,
    _showLabel,
    _multiple = false,
    _attrs = {},
  } = block;
  const fieldId = generateUUID();

  if (!_showLabel) {
    return (
      <select
        {..._styles}
        {...blockProps}
        id={fieldId}
        placeholder={_placeholder}
        required={_required}
        multiple={_multiple as boolean}
        {..._attrs}>
        <option value="" disabled selected hidden>
          {_placeholder}
        </option>
        {map(block._options, (option) => (
          <option
            selected={get(option, "selected", false)}
            key={option.value}
            value={option.value}
            dangerouslySetInnerHTML={{ __html: option.label }}
          />
        ))}
      </select>
    );
  }

  return (
    <div {..._styles} {..._attrs}>
      {_showLabel && <label htmlFor={fieldId}>{_label}</label>}
      <select
        {..._inputStyles}
        id={fieldId}
        placeholder={_placeholder}
        required={_required}
        multiple={_multiple as boolean}
        {..._attrs}>
        <option value="" disabled selected hidden>
          {_placeholder}
        </option>
        {map(block._options, (option) => (
          <option
            key={option.value}
            selected={get(option, "selected", false)}
            value={option.value}
            dangerouslySetInnerHTML={{ __html: option.label }}
          />
        ))}
      </select>
    </div>
  );
};

registerChaiBlock(SelectBlock as React.FC<any>, {
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
    _multiple: Checkbox({ title: "Multiple Choice", default: false }),
    _options: List({
      title: "Options",
      itemProperties: {
        label: SingleLineText({ title: "Label", default: "" }),
        value: SingleLineText({ title: "Value", default: "" }),
      },
    }),
  },
});
