import { get } from "lodash";
import React from "react";
import { TBlock } from "@/sdk/package/types/TBlock";

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

export let BUILDER_BLOCKS: Record<string, BuilderBlock> = {};
export const getBlockComponent = (type: string): any => {
  return get(BUILDER_BLOCKS[type], "component", () => <div>{type} Block not found</div>);
};
