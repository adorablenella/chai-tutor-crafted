import { TBlock } from "@/sdk/package/types/TBlock";
import { registerChaiBlock } from "@/sdk/next/server";
import { MultilineText } from "@/sdk/package/controls/controls";
import { SpaceBetweenVerticallyIcon } from "@radix-ui/react-icons";

const RawTextBlock = (props: TBlock & { content: string }) => {
  return props.content;
};

registerChaiBlock(RawTextBlock, {
  type: "Text",
  label: "Text",
  hidden: true,
  category: "core",
  group: "basic",
  icon: SpaceBetweenVerticallyIcon,
  props: {
    content: MultilineText({ title: "Content", defaultValue: "" }),
  },
});
