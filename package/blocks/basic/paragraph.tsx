import * as React from "react";
import { TextIcon } from "@radix-ui/react-icons";
import { useBlockContentByLanguage } from "../../hooks";
import { registerInternalBlock } from "../../controls";
import { RichText, Styles } from "../../controls/controls";
import { TBlock } from "../../types/TBlock";

/**
 * Heading component
 * @param props
 * @constructor
 */
const ParagraphBlock = (props: TBlock) => {
  const { blockProps, styles } = props;
  const { content } = useBlockContentByLanguage("content", props);
  // eslint-disable-next-line react/no-danger
  return React.createElement("div", { ...styles, ...blockProps, dangerouslySetInnerHTML: { __html: content } });
};

registerInternalBlock(ParagraphBlock as React.FC<any>, {
  type: "Paragraph",
  label: "Paragraph",
  category: "core",
  icon: TextIcon,
  group: "basic",
  props: {
    styles: Styles({ default: "" }),
    content: RichText({
      title: "Content",
      default:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
    }),
  },
});
