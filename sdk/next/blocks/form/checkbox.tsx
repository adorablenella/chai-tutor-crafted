import * as React from "react";
import { CheckboxIcon } from "@radix-ui/react-icons";
import { TBlock } from "@/sdk/package/types/TBlock";
import { generateUUID } from "@/sdk/package/functions/functions";
import { registerChaiBlock } from "@/sdk/next/server";
import { Checkbox, SingleLineText, Styles } from "@/sdk/package/controls/controls";

const CheckboxBlock = (
  block: TBlock & {
    blockProps: Record<string, string>;
    _styles: Record<string, string>;
    _inputStyles: Record<string, string>;
    _required: boolean;
    _checked: boolean;
  },
) => {
  const { blockProps, _label, _styles, _inputStyles, _required, _checked, _showLabel = true, _attrs = {} } = block;
  const fieldId = generateUUID();

  if (!_showLabel)
    return (
      <input
        {...blockProps}
        {..._inputStyles}
        {..._styles}
        id={fieldId}
        type="checkbox"
        required={_required}
        checked={_checked}
        {..._attrs}
      />
    );

  return (
    <div {..._styles} {...blockProps}>
      <input {..._inputStyles} id={fieldId} type="checkbox" required={_required} checked={_checked} {..._attrs} />
      {_label && <label htmlFor={fieldId}>{_label}</label>}
    </div>
  );
};

registerChaiBlock(CheckboxBlock as React.FC<any>, {
  type: "Checkbox",
  label: "Checkbox",
  category: "core",
  icon: CheckboxIcon,
  group: "form",
  props: {
    _styles: Styles({ default: "flex items-center gap-x-2" }),
    _label: SingleLineText({ title: "Label", default: "Label" }),
    _checked: Checkbox({ title: "Checked", default: false }),
    _required: Checkbox({ title: "Required", default: false }),
  },
});
