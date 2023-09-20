import * as React from "react";
import { isEmpty, omit } from "lodash";
import { GroupIcon } from "@radix-ui/react-icons";
import { TBlock } from "../../types/TBlock";
import { registerInternalBlock } from "../../controls";
import { SelectOption, SingleLineText, Slot, Styles } from "../../controls/controls";

const FormBlock = (props: TBlock & { children: React.ReactNode; styles: any; tag: string }) => {
  const { blockProps, success, error, fields, styles } = props;
  let emptySlot: React.ReactNode | null = null;
  if (!fields && isEmpty(styles.className)) {
    emptySlot = (
      <div {...omit(styles, ["className"])} className="h-20 border-dashed border-1 flex items-center justify-center">
        + Add Form Fields here
      </div>
    );
  }
  return (
    <form {...blockProps} {...styles}>
      {success}
      {error}
      {fields || emptySlot}
    </form>
  );
};

registerInternalBlock(FormBlock, {
  type: "Form",
  label: "Form",
  category: "core",
  icon: GroupIcon,
  group: "form",
  props: {
    styles: Styles({ default: "" }),
    success: Slot({ name: "Success Message" }),
    error: Slot({ name: "Error Message" }),
    fields: Slot({ name: "Form Fields" }),
    action: SingleLineText({ title: "Action", default: "https://api.chaibuilder.com/form/submit" }),
    method: SelectOption({
      title: "Method",
      default: "POST",
      options: [
        { value: "POST", title: "POST" },
        { value: "GET", title: "GET" },
      ],
    }),
  },
});
