import * as React from "react";
import { ImageIcon } from "@radix-ui/react-icons";
import BlurImage from "@/components/blur-image";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerServerBlock } from "@/sdk/next/server";
import { Image, SingleLineText, Styles } from "@/sdk/package/controls/controls";

const ImageBlock = (
  block: TBlock & {
    blockProps: Record<string, string>;
    _height: number;
    _width: number;
    _alt: string;
    _styles: Record<string, string>;
  },
) => {
  const { blockProps, _image, _styles, _alt, _height = 200, _width = 200 } = block;
  return React.createElement(BlurImage, {
    ...blockProps,
    ..._styles,
    src: _image,
    alt: _alt,
    height: _height,
    width: _width,
  });
};

registerServerBlock(ImageBlock as React.FC<any>, {
  type: "Image",
  label: "Image",
  category: "core",
  icon: ImageIcon,
  group: "basic",
  props: {
    _styles: Styles({ default: "" }),
    _image: Image({ title: "Image", default: "https://fakeimg.pl/100x100?text=Choose&font=bebas" }),
    _alt: SingleLineText({ title: "Alt", default: "" }),
    _width: SingleLineText({ title: "Width", default: "200" }),
    _height: SingleLineText({ title: "Height", default: "200" }),
  },
});
