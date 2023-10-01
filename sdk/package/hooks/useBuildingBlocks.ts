import { useAtomValue } from "jotai";
import { useCallback } from "react";
import { map } from "lodash";
import { globalBlocksAtom } from "../store/buildingBlocks";
import { BUILDER_BLOCKS } from "../blocks/builder-blocks";

const setBlocks = (ids: any) => {};

export const useBuildingBlocks = (): [Array<any>, Array<any>, Function, Function] => {
  const blocks = BUILDER_BLOCKS;
  const globalBlocks = useAtomValue(globalBlocksAtom);

  const addGlobalBlock = (block: any) => {
    setBlocks(block);
  };

  /**
   * Update blocks on complete
   */
  const updateGlobalBlocks = useCallback((newGlobalBlocks: any[]) => {
    const blockIds: string[] = map(newGlobalBlocks, "block_id");
    return setBlocks(blockIds);
  }, []);

  return [blocks as any, globalBlocks, addGlobalBlock, updateGlobalBlocks];
};
