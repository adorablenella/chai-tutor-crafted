import * as React from "react";
import { isEmpty, omit } from "lodash";
import { GroupIcon, LetterCaseToggleIcon } from "@radix-ui/react-icons";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerChaiBlock } from "@/sdk/next/server";
import { SelectOption, SingleLineText, Slot, Styles } from "@/sdk/package/controls/controls";

const FormBlock = (
  props: TBlock & { children: React.ReactNode; _styles: any; _tag: string; blockProps: Record<string, string> },
) => {
  const { blockProps, _success, _error, _fields, _styles, children } = props;
  let emptySlot: React.ReactNode | null = null;
  if (!_fields && isEmpty(_styles?.className)) {
    emptySlot = (
      <div {...omit(_styles, ["className"])} className="border-1 flex h-20 items-center justify-center border-dashed">
        + Add Form Fields here
      </div>
    );
  }
  return (
    <form {...blockProps} {..._styles}>
      {_success}
      {_error}
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
    _method: SelectOption({
      title: "Method",
      default: "POST",
      options: [
        { value: "POST", title: "POST" },
        { value: "GET", title: "GET" },
      ],
    }),
  },
});

const LabelBlock = (
  props: TBlock & { children: React.ReactNode; _styles: any; _content: string; blockProps: Record<string, string> },
) => {
  const { blockProps, _content, _styles, children } = props;
  if (children) return React.createElement("label", { ..._styles, ...blockProps }, children);
  return React.createElement("label", { ..._styles, ...blockProps, dangerouslySetInnerHTML: { __html: _content } });
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
