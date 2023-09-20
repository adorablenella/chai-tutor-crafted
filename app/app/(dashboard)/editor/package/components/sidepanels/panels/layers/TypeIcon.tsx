import React from "react";
import { BoxIcon, HeadingIcon, ImageIcon, TextIcon } from "@radix-ui/react-icons";

type Props = {
  type?: string;
};

export const TypeIcon: React.FC<Props> = (props) => {
  switch (props.type) {
    case "Image":
      return <ImageIcon />;
    case "Heading":
      return <HeadingIcon />;
    case "Text":
      return <TextIcon />;
    default:
      return <BoxIcon />;
  }
};
