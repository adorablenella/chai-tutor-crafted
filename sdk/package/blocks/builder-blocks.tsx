import { get, keys, mapValues, pick } from "lodash";
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

export let BUILDER_BLOCKS: Record<string, BuilderBlock> = {};
export const getBlockComponent = (type: string): React.FC<any> => {
  return get(BUILDER_BLOCKS[type], "component", () => (isDevelopment() ? <div>{type} Block not found</div> : null));
};

export const getDefaultBlockProps = (type: string) => {
  return mapValues(BUILDER_BLOCKS[type]["props"], "default");
};

export const syncBlocksWithDefaults = (blocks: TBlock[]): TBlock[] => {
  return blocks.map((block) => {
    if (BUILDER_BLOCKS[block._type]) {
      const defaults = getDefaultBlockProps(block._type);
      return {
        ...defaults,
        ...pick(block, [...keys(defaults), ...["_type", "_id", "_name", "_parent", "_bindings", "_attrs"]]),
      } as TBlock;
    }
    return block;
  });
};
