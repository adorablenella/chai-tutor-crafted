import * as React from "react";
import { CursorTextIcon } from "@radix-ui/react-icons";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerChaiBlock } from "@/sdk/next/server";
import { RichText, Styles } from "@/sdk/package/controls/controls";

/**
 * Heading component
 * @param props
 * @constructor
 */
const RichTextBlock = (props: TBlock & { blockProps: Record<string, string>; _styles: Record<string, string> }) => {
  const { blockProps, _content, _styles } = props;
  // eslint-disable-next-line react/no-danger
  return (
    <div className="prose max-w-full">
      <div {...blockProps} {..._styles} dangerouslySetInnerHTML={{ __html: _content }} />
    </div>
  );
};

registerChaiBlock(RichTextBlock as React.FC<any>, {
  type: "RichText",
  label: "Rich Text",
  category: "core",
  icon: CursorTextIcon,
  group: "basic",
  props: {
    _styles: Styles({ default: "" }),
    _content: RichText({
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
