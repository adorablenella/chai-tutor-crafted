import React from "react";
import { NodeModel } from "@minoru/react-dnd-treeview";

type Props = {
  depth: number;
  // eslint-disable-next-line react/no-unused-prop-types
  node: NodeModel;
};

export const Placeholder: React.FC<Props> = (props) => {
  const left = props.depth * 10;
  return <div className="h-0.5 bg-green-500 absolute top-0 right-0 transform -translate-y-1/2" style={{ left }} />;
};
