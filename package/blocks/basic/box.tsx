import * as React from "react";
import { TBlock } from "../../types/TBlock";
import { registerInternalBlock } from "../../controls";
import { SelectOption, Styles } from "../../controls/controls";
import { cn } from "../../radix/lib/utils";

const BoxBlock = (props: TBlock & { children: React.ReactNode; styles: any; tag: string }) => {
  const { blockProps, children, tag = "div", styles } = props;
  let emptySlot: React.ReactNode | null = null;
  if (!children) {
    emptySlot = (
      <div className={cn("h-20 flex flex-col items-center justify-center", props.className)}>
        <div className="border-dashed border-4 w-full h-full rounded-md" />
      </div>
    );
  }
  return React.createElement(tag, { ...blockProps, droppable: "yes", ...styles }, children || emptySlot);
};

registerInternalBlock(BoxBlock, {
  type: "Box",
  label: "Box",
  category: "core",
  group: "basic",
  props: {
    styles: Styles({ default: "" }),
    tag: SelectOption({
      title: "Tag",
      default: "div",
      options: [
        { value: "div", title: "div" },
        { value: "header", title: "header" },
        { value: "footer", title: "footer" },
        { value: "section", title: "section" },
        { value: "article", title: "article" },
        { value: "aside", title: "aside" },
        { value: "main", title: "main" },
        { value: "nav", title: "nav" },
        { value: "figure", title: "figure" },
        { value: "details", title: "details" },
        { value: "summary", title: "summary" },
      ],
    }),
  },
});
