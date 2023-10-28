import * as React from "react";
import { InputIcon } from "@radix-ui/react-icons";
import { map } from "lodash";
import { TBlock } from "@/sdk/package/types/TBlock";
import { generateUUID } from "@/sdk/package/functions/functions";
import { registerChaiBlock } from "@/sdk/next/server";
import { Checkbox, SelectOption, SingleLineText, Styles } from "@/sdk/package/controls/controls";

const InputBlock = (
  block: TBlock & {
    inBuilder: boolean;
    blockProps: Record<string, string>;
    _styles: Record<string, string>;
    _inputStyles: Record<string, string>;
    _required: boolean;
    _value: string;
    _name: string;
  },
) => {
  const {
    blockProps,
    _label,
    _placeholder,
    _styles,
    _inputStyles,
    _showLabel,
    _required,
    _inputType = "text",
    inBuilder,
    _name,
    _value,
    _attrs = {},
  } = block;
  const fieldId = generateUUID();

  if (!_showLabel || _inputType === "submit") {
    if (_inputType === "submit") blockProps.value = _label;

    return (
      <input
        name={_name}
        value={_value}
        readOnly={inBuilder}
        {...blockProps}
        {..._inputStyles}
        {..._styles}
        id={fieldId}
        type={_inputType}
        placeholder={_placeholder}
        required={_required}
        {..._attrs}
      />
    );
  }
  return (
    <div {..._styles} {...blockProps}>
      {_showLabel && <label htmlFor={fieldId}>{_label}</label>}
      <input
        name={_name}
        value={_value}
        readOnly={inBuilder}
        {..._inputStyles}
        id={fieldId}
        type={_inputType}
        placeholder={_placeholder}
        required={_required}
        {..._attrs}
      />
    </div>
  );
};

registerChaiBlock(InputBlock as React.FC<any>, {
  type: "Input",
  label: "Input",
  category: "core",
  icon: InputIcon,
  group: "form",
  props: {
    _styles: Styles({ default: "" }),
    _name: SingleLineText({ title: "Field Name", default: "input" }),
    _inputType: SelectOption({
      title: "Type",
      options: map(
        ["text", "email", "password", "number", "tel", "file", "hidden", "range", "submit", "color", "date", "time"],
        (type) => ({
          value: type,
          title: type,
        }),
      ),
      default: "text",
    }),
    _value: SingleLineText({ title: "Value", default: "" }),
    _showLabel: Checkbox({ title: "Show label", default: true }),
    _inputStyles: Styles({ default: "w-full p-1" }),
    _label: SingleLineText({ title: "Label", default: "Label" }),
    _placeholder: SingleLineText({ title: "Placeholder", default: "Placeholder" }),
    _required: Checkbox({ title: "Required", default: false }),
  },
});
