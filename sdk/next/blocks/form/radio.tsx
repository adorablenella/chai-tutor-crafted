import * as React from "react";
import { RadiobuttonIcon } from "@radix-ui/react-icons";
import { TBlock } from "@/sdk/package/types/TBlock";
import { generateUUID } from "@/sdk/package/functions/functions";
import { registerServerBlock } from "@/sdk/next/server";
import { Checkbox, SingleLineText, Styles } from "@/sdk/package/controls/controls";

const RadioBlock = (
  block: TBlock & {
    blockProps: Record<string, string>;
    styles: Record<string, string>;
    inputStyles: Record<string, string>;
    required: boolean;
    checked: boolean;
  },
) => {
  const { blockProps, label, styles, inputStyles } = block;
  const fieldId = generateUUID();
  return (
    <div {...styles} {...blockProps}>
      <input {...inputStyles} id={fieldId} type="radio" required={block.required} checked={block.checked} />
      <label htmlFor={fieldId}>{label}</label>
    </div>
  );
};

registerServerBlock(RadioBlock as React.FC<any>, {
  type: "Radio",
  label: "Radio",
  category: "core",
  icon: RadiobuttonIcon,
  group: "form",
  props: {
    styles: Styles({ default: "flex items-center w-max gap-x-2" }),
    label: SingleLineText({ title: "Label", default: "Label" }),
    checked: Checkbox({ title: "Checked", default: false }),
    required: Checkbox({ title: "Required", default: false }),
  },
});
