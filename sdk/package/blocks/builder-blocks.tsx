import { get } from "lodash";
import React from "react";
import { TBlock } from "../types/TBlock";
import { isDevelopment } from "../helpers/general";

/**
 * This is global builder blocks
 */

type BuilderBlock = {
  component: React.FC<TBlock>;
  group: string;
  icon?: any;
  label?: string;
  props?: any;
  type: string;
};

export const BUILDER_BLOCKS: Record<string, BuilderBlock> = {};
export const getBlockComponent = (type: string): any => {
  console.log("type", type, BUILDER_BLOCKS);
  return get(BUILDER_BLOCKS[type], "component", () => (isDevelopment() ? <div>{type} Block not found</div> : null));
};
