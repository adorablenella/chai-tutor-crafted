import { useAtom, useAtomValue } from "jotai";
import { useCallback } from "react";
import { find, get, includes, isEmpty, map } from "lodash";
import { buildingBlocksAtom, globalBlocksAtom } from "../store/buildingBlocks";
import { TBlock } from "../types/TBlock";

export const useBuildingBlocks = (): [Array<any>, Array<any>, Function, Function] => {
  const [blocks, setBlocks] = useAtom(buildingBlocksAtom);
  const globalBlocks = useAtomValue(globalBlocksAtom);

  const addGlobalBlock = (block: any) => {
    setBlocks((prev: any) => [...prev, block]);
  };

  /**
   * Update blocks on complete
   */
  const updateGlobalBlocks = useCallback(
    (newGlobalBlocks: any[]) => {
      const blockIds: string[] = map(newGlobalBlocks, "block_id");
      return setBlocks((b: any[]) =>
        map(b, (block: any) => {
          const blockId: string = get(block, "block_id", "");
          if (isEmpty(blockId)) return block;
          return includes(blockIds, blockId) ? find(newGlobalBlocks, { block_id: blockId }) : block;
        })
      );
    },
    [setBlocks]
  );
  return [blocks as TBlock[], globalBlocks, addGlobalBlock, updateGlobalBlocks];
};
