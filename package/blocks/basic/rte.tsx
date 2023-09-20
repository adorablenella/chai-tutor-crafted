import * as React from "react";
import { CursorTextIcon } from "@radix-ui/react-icons";
import { useBlockContentByLanguage } from "../../hooks";
import { registerInternalBlock } from "../../controls";
import { RichText, Styles } from "../../controls/controls";
import { TBlock } from "../../types/TBlock";

/**
 * Heading component
 * @param props
 * @constructor
 */
const RichTextBlock = (props: TBlock) => {
  const { blockProps, styles } = props;
  const { content } = useBlockContentByLanguage("content", props);
  // eslint-disable-next-line react/no-danger
  return (
    <div className="prose max-w-full">
      <div {...blockProps} {...styles} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

registerInternalBlock(RichTextBlock as React.FC<any>, {
  type: "RichText",
  label: "Rich Text",
  category: "core",
  icon: CursorTextIcon,
  group: "basic",
  props: {
    styles: Styles({ default: "" }),
    content: RichText({
      title: "Content",
      default:
        "Lorem Ipsum Rich Text Editor Demo\n" +
        "\n" +
        "Welcome to our rich text editor demo! With our powerful editor, you can create stunning documents with ease. Let's explore some of its features:\n" +
        "\n" +
        "Text Formatting: You can make text bold, italic, or underline it.\n" +
        "Lists:\n" +
        "Create ordered lists.\n" +
        "Craft unordered lists.\n" +
        "Utilize nested lists for organization.",
    }),
  },
});
