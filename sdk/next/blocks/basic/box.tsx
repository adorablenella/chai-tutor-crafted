import * as React from "react";
import { TBlock } from "@/sdk/package/types/TBlock";
import { cn } from "@/sdk/package/radix/lib/utils";
import { registerChaiBlock } from "@/sdk/next/server";
import { SelectOption, Styles } from "@/sdk/package/controls/controls";
import { isEmpty } from "lodash";

const BoxBlock = (
  props: TBlock & { children: React.ReactNode; _styles: any; tag: string; blockProps: Record<string, string> },
) => {
  const { blockProps, children, _tag = "div", _styles, _attrs = {} } = props;

  let emptySlot: React.ReactNode | null = null;
  if (!children && isEmpty(_styles?.className)) {
    emptySlot = (
      <div className={cn("flex h-20 flex-col items-center justify-center", props.className)}>
        <div className="h-full w-full rounded-md border-4 border-dashed" />
      </div>
    );
  }

  return React.createElement(_tag, { ...blockProps, ..._styles, ..._attrs }, children || emptySlot);
};

registerChaiBlock(BoxBlock, {
  type: "Box",
  label: "Box",
  category: "core",
  group: "basic",
  props: {
    _styles: Styles({ default: "" }),
    _tag: SelectOption({
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
        { value: "dialog", title: "dialog" },
        { value: "strike", title: "strike" },
        { value: "caption", title: "caption" },
        { value: "legend", title: "legend" },
        { value: "figcaption", title: "figcaption" },
        { value: "mark", title: "mark" },
      ],
    }),
  },
});
