import * as React from "react";
import { InputIcon } from "@radix-ui/react-icons";
import { TBlock } from "@/sdk/package/types/TBlock";
import { generateUUID } from "@/sdk/package/functions/functions";
import { registerChaiBlock } from "@/sdk/next/server";
import { Checkbox, Numeric, SingleLineText, Styles } from "@/sdk/package/controls/controls";

const InputBlock = (
  block: TBlock & {
    blockProps: Record<string, string>;
    _styles: Record<string, string>;
    _inputStyles: Record<string, string>;
    _required: boolean;
    _options: { label: string; value: string }[];
    _rows: number;
  },
) => {
  const { blockProps, _label, _placeholder, _styles, _inputStyles, _rows, _showLabel } = block;
  const fieldId = generateUUID();

  if (!_showLabel) {
    return (
      <textarea {...blockProps} {..._inputStyles} {..._styles} id={fieldId} placeholder={_placeholder} rows={_rows} />
    );
  }

  return (
    <div {..._styles} {...blockProps}>
      {_showLabel && <label htmlFor={fieldId}>{_label}</label>}
      <textarea {..._inputStyles} id={fieldId} placeholder={_placeholder} rows={_rows} />
    </div>
  );
};

registerChaiBlock(InputBlock as React.FC<any>, {
  type: "TextArea",
  label: "TextArea",
  category: "core",
  icon: InputIcon,
  group: "form",
  props: {
    _showLabel: Checkbox({ title: "Show label", default: true }),
    _styles: Styles({ default: "" }),
    _inputStyles: Styles({ default: "w-full p-1" }),
    _label: SingleLineText({ title: "Label", default: "Label" }),
    _placeholder: SingleLineText({ title: "Placeholder", default: "Placeholder" }),
    _rows: Numeric({ title: "Rows", default: 3 }),
  },
});
