import { TBlock } from "@/sdk/package/types/TBlock";
import { registerChaiBlock } from "@/sdk/next/server";
import { MultilineText } from "@/sdk/package/controls/controls";
import { SpaceBetweenVerticallyIcon } from "@radix-ui/react-icons";

const RawTextBlock = (props: TBlock & { _content: string }) => {
  return props._content;
};

registerChaiBlock(RawTextBlock, {
  type: "Text",
  label: "Text",
  hidden: true,
  category: "core",
  group: "basic",
  icon: SpaceBetweenVerticallyIcon,
  props: {
    _content: MultilineText({ title: "Content", defaultValue: "" }),
  },
});
