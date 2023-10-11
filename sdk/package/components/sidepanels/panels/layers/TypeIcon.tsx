import React from "react";
import {
  BoxIcon,
  ButtonIcon,
  CursorTextIcon,
  DividerHorizontalIcon,
  HeadingIcon,
  ImageIcon,
  Link1Icon,
  RowsIcon,
  SketchLogoIcon,
  TextIcon,
  VideoIcon,
  CodeIcon,
  ColumnsIcon,
  SpaceBetweenVerticallyIcon,
} from "@radix-ui/react-icons";

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
    case "Link":
      return <Link1Icon />;
    case "Video":
      return <VideoIcon />;
    case "RichText":
      return <CursorTextIcon />;
    case "Button":
      return <ButtonIcon />;
    case "CustomHTML":
      return <CodeIcon />;
    case "Divider":
      return <DividerHorizontalIcon />;
    case "Icon":
      return <SketchLogoIcon />;
    case "List":
      return <RowsIcon />;
    case "Paragraph":
      return <TextIcon />;
    case "Row":
      return <RowsIcon />;
    case "ListItem":
      return <ColumnsIcon />;
    case "LineBreak":
      return <SpaceBetweenVerticallyIcon />;
    default:
      return <BoxIcon />;
  }
};
