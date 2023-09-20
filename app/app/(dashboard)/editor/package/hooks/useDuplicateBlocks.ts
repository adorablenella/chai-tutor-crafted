import { useCallback } from "react";
import { useAtomValue } from "jotai";
import { each, get } from "lodash";
import { useDispatch } from "./useTreeData";
import { presentBlocksAtom } from "../store/blocks";
import { getDuplicatedBlocks } from "../functions/Blocks";
import { useSelectedBlockIds } from "./useSelectedBlockIds";

/**
 * useDuplicateBlock
 */
export const useDuplicateBlocks = (): Function => {
  const dispatch = useDispatch();
  const presentBlocks = useAtomValue(presentBlocksAtom);
  const [, setSelected] = useSelectedBlockIds();

  return useCallback(
    (blockIds: Array<string>, newParentId: string | null = null) => {
      const newBlockIds: string[] = [];
      each(blockIds, (blockId) => {
        const newParent = newParentId === blockId ? null : newParentId;
        const newBlocks = getDuplicatedBlocks(presentBlocks, blockId, newParent);
        newBlockIds.push(get(newBlocks, "0._id", ""));
        dispatch({ type: "add_duplicate_blocks", payload: newBlocks });
      });
      setSelected(newBlockIds);
      dispatch({ type: "create_snapshot" });
    },
    [presentBlocks, setSelected, dispatch]
  );
};
