import * as React from "react";
import { ButtonIcon } from "@radix-ui/react-icons";
import { TBlock } from "@/sdk/package/types/TBlock";
import { generateUUID } from "@/sdk/package/functions/functions";
import { registerChaiBlock } from "@/sdk/next/server";
import { Icon, SelectOption, SingleLineText, Styles } from "@/sdk/package/controls/controls";

const FormButtonBlock = (
  block: TBlock & {
    blockProps: Record<string, string>;
    _styles: Record<string, string>;
    _inputStyles: Record<string, string>;
  },
) => {
  const { blockProps, _label, _placeholder, _styles, _inputStyles, _icon, _iconPos, _attrs = {} } = block;
  const fieldId = generateUUID();

  return (
    <button
      {..._inputStyles}
      {..._styles}
      {...(blockProps || {})}
      id={fieldId}
      type="submit"
      placeholder={_placeholder}
      {..._attrs}>
      {_label}
      {_icon && <span className={_iconPos} dangerouslySetInnerHTML={{ __html: _icon }} />}
    </button>
  );
};

registerChaiBlock(FormButtonBlock as React.FC<any>, {
  type: "FormButton",
  label: "FormButton",
  category: "core",
  icon: ButtonIcon,
  group: "form",
  props: {
    _label: SingleLineText({ title: "Label", default: "Submit" }),
    _styles: Styles({ default: "text-white bg-primary px-4 py-2 rounded-global flex items-center gap-x-2" }),
    _icon: Icon({ title: "Icon", default: "" }),
    _iconPos: SelectOption({
      title: "Icon Position",
      default: "order-last",
      options: [
        { title: "Start", value: "order-first" },
        { title: "End", value: "order-last" },
      ],
    }),
  },
});
