import * as React from "react";
import { ImageIcon } from "@radix-ui/react-icons";
import { registerInternalBlock } from "../../controls";
import { Image, Styles } from "../../controls/controls";
import { TBlock } from "../../types/TBlock";

const ImageBlock = (block: TBlock & { blockProps: Record<string, string>; styles: Record<string, string> }) => {
  const { blockProps, image, styles } = block;
  return React.createElement("img", { ...blockProps, ...styles, src: image });
};

registerInternalBlock(ImageBlock as React.FC<any>, {
  type: "Image",
  label: "Image",
  category: "core",
  icon: ImageIcon,
  group: "basic",
  props: {
    styles: Styles({ default: "" }),
    image: Image({ title: "Image", default: "https://placehold.it/100" }),
  },
});
