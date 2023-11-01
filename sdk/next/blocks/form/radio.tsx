import * as React from "react";
import { RadiobuttonIcon } from "@radix-ui/react-icons";
import { TBlock } from "@/sdk/package/types/TBlock";
import { generateUUID } from "@/sdk/package/functions/functions";
import { registerChaiBlock } from "@/sdk/next/server";
import { Checkbox, SingleLineText, Styles } from "@/sdk/package/controls/controls";

const RadioBlock = (
  block: TBlock & {
    blockProps: Record<string, string>;
    _styles: Record<string, string>;
    _inputStyles: Record<string, string>;
    _required: boolean;
    _checked: boolean;
  },
) => {
  const { blockProps, _fieldName, _label, _styles, _inputStyles, _checked, _required, _showLabel = true } = block;
  const fieldId = generateUUID();

  if (!_showLabel)
    return (
      <input
        id={fieldId}
        {...blockProps}
        {..._inputStyles}
        {..._styles}
        type="radio"
        required={_required}
        checked={_checked}
        name={_fieldName}
      />
    );
  return (
    <div {..._styles} {...blockProps}>
      <input
        {..._inputStyles}
        name={_fieldName}
        id={fieldId}
        type="radio"
        required={_required}
        defaultChecked={_checked}
      />
      {_label && <label htmlFor={fieldId}>{_label}</label>}
    </div>
  );
};

registerChaiBlock(RadioBlock as React.FC<any>, {
  type: "Radio",
  label: "Radio",
  category: "core",
  icon: RadiobuttonIcon,
  group: "form",
  props: {
    _styles: Styles({ default: "flex items-center w-max gap-x-2" }),
    _fieldName: SingleLineText({ title: "Field Name", default: "radio" }),
    _label: SingleLineText({ title: "Label", default: "Label" }),
    _checked: Checkbox({ title: "Checked", default: false }),
    _required: Checkbox({ title: "Required", default: false }),
  },
});
