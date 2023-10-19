import * as React from "react";
import { isEmpty, omit } from "lodash";
import { GroupIcon, LetterCaseToggleIcon } from "@radix-ui/react-icons";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerChaiBlock } from "@/sdk/next/server";
import { SingleLineText, Slot, Styles } from "@/sdk/package/controls/controls";

const FormBlock = (
  props: TBlock & { children: React.ReactNode; _styles: any; _tag: string; blockProps: Record<string, string> },
) => {
  const { blockProps, _success, _error, _fields, _styles, children, _attrs = {} } = props;
  let emptySlot: React.ReactNode | null = null;
  if (!_fields && isEmpty(_styles?.className)) {
    emptySlot = (
      <div {...omit(_styles, ["className"])} className="border-1 flex h-20 items-center justify-center border-dashed">
        + Add Form Fields here
      </div>
    );
  }
  return (
    <form {...blockProps} {..._styles} {..._attrs}>
      {children || _fields || emptySlot}
    </form>
  );
};

registerChaiBlock(FormBlock, {
  type: "Form",
  label: "Form",
  category: "core",
  icon: GroupIcon,
  group: "form",
  props: {
    _styles: Styles({ default: "" }),
    _success: Slot({ name: "Success Message" }),
    _error: Slot({ name: "Error Message" }),
    _fields: Slot({ name: "Form Fields" }),
    _action: SingleLineText({ title: "Action", default: "https://api.chaibuilder.com/form/submit" }),
  },
});

const LabelBlock = (
  props: TBlock & { children: React.ReactNode; _styles: any; _content: string; blockProps: Record<string, string> },
) => {
  const { blockProps, _content, _styles, children, ..._attrs } = props;
  const labelProps = { ..._styles, ...blockProps, ..._attrs };

  if (children) return React.createElement("label", labelProps, children);
  return React.createElement("label", { ...labelProps, dangerouslySetInnerHTML: { __html: _content } });
};

registerChaiBlock(LabelBlock, {
  type: "Label",
  label: "Label",
  category: "core",
  icon: LetterCaseToggleIcon,
  group: "form",
  props: {
    _styles: Styles({ default: "" }),
    _content: SingleLineText({ title: "Content", default: "Label" }),
  },
});
