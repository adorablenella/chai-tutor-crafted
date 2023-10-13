import * as React from "react";
import { TextIcon } from "@radix-ui/react-icons";
import { registerChaiBlock } from "@/sdk/next/server";
import { RichText, Styles } from "@/sdk/package/controls/controls";
import { TBlock } from "@/sdk/package/types/TBlock";
import { isNull } from "lodash";

/**
 * Heading component
 * @param props
 * @constructor
 */
const ParagraphBlock = (
  props: TBlock & { blockProps: Record<string, string>; _styles: Record<string, string>; children: React.ReactNode },
) => {
  const { blockProps, _styles, _content } = props;

  if (!isNull(props.children)) return React.createElement("p", { ..._styles, ...blockProps }, props.children);

  // eslint-disable-next-line react/no-danger
  return React.createElement("p", { ..._styles, ...blockProps, dangerouslySetInnerHTML: { __html: _content } });
};

registerChaiBlock(ParagraphBlock as React.FC<any>, {
  type: "Paragraph",
  label: "Paragraph",
  category: "core",
  icon: TextIcon,
  group: "basic",
  props: {
    _styles: Styles({ default: "" }),
    _content: RichText({
      title: "Content",
      default:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
    }),
  },
});
