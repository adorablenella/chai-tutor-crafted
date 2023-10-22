import React from "react";
import { NodeModel } from "@minoru/react-dnd-treeview";

type Props = {
  depth: number;
  // eslint-disable-next-line react/no-unused-prop-types
  node: NodeModel;
};

export const Placeholder: React.FC<Props> = (props) => {
  const left = props.depth * 10;
  return <div className="absolute right-0 top-0 h-1 -translate-y-1/2 transform bg-green-500" style={{ left }} />;
};
