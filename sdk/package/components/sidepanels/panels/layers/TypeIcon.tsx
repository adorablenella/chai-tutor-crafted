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
  GroupIcon,
  CheckboxIcon,
  InputIcon,
  RadiobuttonIcon,
  DropdownMenuIcon,
  TableIcon,
  BorderTopIcon,
  BorderAllIcon,
  ViewHorizontalIcon,
  DragHandleHorizontalIcon,
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
    case "Form":
      return <GroupIcon />;
    case "Checkbox":
      return <CheckboxIcon />;
    case "FormButton":
      return <ButtonIcon />;
    case "Input":
    case "TextArea":
      return <InputIcon />;
    case "Radio":
      return <RadiobuttonIcon />;
    case "Select":
      return <DropdownMenuIcon />;
    case "Table":
      return <TableIcon />;
    case "TableHead":
      return <BorderTopIcon />;
    case "TableBody":
      return <BorderAllIcon />;
    case "TableRow":
      return <ViewHorizontalIcon />;
    case "TableCell":
      return <DragHandleHorizontalIcon />;
    default:
      return <BoxIcon />;
  }
};
