import React from "react";
import { DragLayerMonitorProps } from "@minoru/react-dnd-treeview";
import { TypeIcon } from "./TypeIcon";

type Props = {
  monitorProps: DragLayerMonitorProps<any>;
};

export const CustomDragPreview: React.FC<Props> = (props) => {
  const { item } = props.monitorProps;

  return (
    <div className="flex w-max items-center bg-blue-200 bg-opacity-30 p-1 font-semibold text-blue-700">
      <div className="">
        <TypeIcon type={item?.data?._type} />
      </div>
      <div className="ml-2 truncate text-[11px]">{item.text}</div>
    </div>
  );
};
