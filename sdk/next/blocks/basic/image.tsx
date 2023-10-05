import * as React from "react";
import { ImageIcon } from "@radix-ui/react-icons";
import BlurImage from "@/components/blur-image";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerServerBlock } from "@/sdk/next/server";
import { Image, SingleLineText, Styles } from "@/sdk/package/controls/controls";

const ImageBlock = (
  block: TBlock & {
    blockProps: Record<string, string>;
    height: number;
    width: number;
    alt: string;
    styles: Record<string, string>;
  },
) => {
  const { blockProps, image, styles, alt, height = 200, width = 200 } = block;
  return React.createElement(BlurImage, { ...blockProps, ...styles, src: image, alt, height, width });
};

registerServerBlock(ImageBlock as React.FC<any>, {
  type: "Image",
  label: "Image",
  category: "core",
  icon: ImageIcon,
  group: "basic",
  props: {
    styles: Styles({ default: "" }),
    image: Image({ title: "Image", default: "https://placehold.it/100" }),
    alt: SingleLineText({ title: "Alt", default: "" }),
    width: SingleLineText({ title: "Width", default: "200" }),
    height: SingleLineText({ title: "Height", default: "200" }),
  },
});
