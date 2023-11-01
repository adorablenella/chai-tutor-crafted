import * as React from "react";
import { ImageIcon } from "@radix-ui/react-icons";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerChaiBlock } from "@/sdk/next/server";
import { Image, SingleLineText, Styles } from "@/sdk/package/controls/controls";
import { isEmpty } from "lodash";
import EmptySlot from "../helper-components/empty-slot";

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

  if (isEmpty(_image)) return <EmptySlot blockProps={blockProps} text="IMAGE URL" className="h-36" />;

  return React.createElement("img", {
    ...blockProps,
    ..._styles,
    src: _image,
    alt: _alt,
    height: _height,
    width: _width,
  });
};

registerChaiBlock(ImageBlock as React.FC<any>, {
  type: "Image",
  label: "Image",
  category: "core",
  icon: ImageIcon,
  group: "basic",
  props: {
    _styles: Styles({ default: "" }),
    _image: Image({ title: "Image", default: "https://fakeimg.pl/400x200?text=Choose&font=bebas" }),
    _alt: SingleLineText({ title: "Alt", default: "" }),
    _width: SingleLineText({ title: "Width", default: "" }),
    _height: SingleLineText({ title: "Height", default: "" }),
  },
});
