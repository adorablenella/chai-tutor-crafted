import * as React from "react";
import { isEmpty, omit } from "lodash";
import { GroupIcon, LetterCaseToggleIcon } from "@radix-ui/react-icons";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerChaiBlock } from "@/sdk/next/server";
import { RichText, SingleLineText, Styles } from "@/sdk/package/controls/controls";
import EmptySlot from "../helper-components/empty-slot";

const FormBlock = (
  props: TBlock & {
    children: React.ReactNode;
    _styles: any;
    _tag: string;
    inBuilder: boolean;
    blockProps: Record<string, string>;
  },
) => {
  const { blockProps, _errorMessage, _successMessage, _action, _styles, children, _attrs = {} } = props;

  if (!children && isEmpty(_styles?.className)) {
    return <EmptySlot blockProps={blockProps} text="FORM FIELDS" />;
  }

  return (
    <form
      data-error={_errorMessage}
      data-success={_successMessage}
      method={"post"}
      action={_action}
      {...blockProps}
      {..._styles}
      {..._attrs}>
      {children}
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
    _action: SingleLineText({ title: "Submit URL", default: "/api/form/submit" }),
    _errorMessage: RichText({
      title: "Error Message",
      default: "Something went wrong. Please try again",
    }),
    _successMessage: RichText({
      title: "Success Message",
      default: "Thank you for your submission.",
    }),
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
