import * as React from "react";
import { InputIcon } from "@radix-ui/react-icons";
import { map } from "lodash";
import { TBlock } from "@/sdk/package/types/TBlock";
import { generateUUID } from "@/sdk/package/functions/functions";
import { registerChaiBlock } from "@/sdk/next/server";
import { Checkbox, SelectOption, SingleLineText, Styles } from "@/sdk/package/controls/controls";

const InputBlock = (
  block: TBlock & {
    blockProps: Record<string, string>;
    _styles: Record<string, string>;
    _inputStyles: Record<string, string>;
  },
) => {
  const { blockProps, _type, _label, _placeholder, _styles, _inputStyles } = block;
  const fieldId = generateUUID();
  return (
    <div {..._styles} {...blockProps}>
      <label htmlFor={fieldId}>{_label}</label>
      <input {..._inputStyles} id={fieldId} type={_type} placeholder={_placeholder} />
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
    _showLabel: Checkbox({ title: "Show label", default: true }),
    _styles: Styles({ default: "" }),
    _inputStyles: Styles({ default: "w-full p-1" }),
    _label: SingleLineText({ title: "Label", default: "Label" }),
    _placeholder: SingleLineText({ title: "Placeholder", default: "Placeholder" }),
    _inputType: SelectOption({
      title: "Type",
      options: map(["text", "email", "password", "number"], (type) => ({ value: type, title: type })),
      default: "text",
    }),
  },
});
