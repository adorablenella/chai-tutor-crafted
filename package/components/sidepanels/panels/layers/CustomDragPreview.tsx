import React from "react";
import { DragLayerMonitorProps } from "@minoru/react-dnd-treeview";
import { TypeIcon } from "./TypeIcon";

type Props = {
  monitorProps: DragLayerMonitorProps<any>;
};

export const CustomDragPreview: React.FC<Props> = (props) => {
  const { item } = props.monitorProps;

  return (
    <div className="">
      <div className="">
        <TypeIcon type={item?.data?.type} />
      </div>
      <div className="">{item.text}</div>
    </div>
  );
};
