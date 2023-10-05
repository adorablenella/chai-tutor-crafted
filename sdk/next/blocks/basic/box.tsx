import * as React from "react";
import { TBlock } from "@/sdk/package/types/TBlock";
import { cn } from "@/sdk/package/radix/lib/utils";
import { registerServerBlock } from "@/sdk/next/server";
import { SelectOption, Styles } from "@/sdk/package/controls/controls";

const BoxBlock = (
  props: TBlock & { children: React.ReactNode; styles: any; tag: string; blockProps: Record<string, string> },
) => {
  const { blockProps, children, tag = "div", styles } = props;
  let emptySlot: React.ReactNode | null = null;
  if (!children) {
    emptySlot = (
      <div className={cn("flex h-20 flex-col items-center justify-center", props.className)}>
        <div className="h-full w-full rounded-md border-4 border-dashed" />
      </div>
    );
  }
  return React.createElement(tag, { ...blockProps, droppable: "yes", ...styles }, children || emptySlot);
};

registerServerBlock(BoxBlock, {
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
