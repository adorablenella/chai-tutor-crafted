import { useAtomValue } from "jotai";
import { filter, find, includes } from "lodash";
import { useCallback } from "react";
import { presentBlocksAtom } from "../store/blocks";
import { useDispatch } from "./useTreeData";
import { useSelectedBlockIds } from "./useSelectedBlockIds";
import { TBlock } from "../types/TBlock";

const removeBlocks = (blocks: TBlock[], blockIds: Array<string>) => {
  const removableBlockIds: Array<string> = [];
  return filter(blocks, (block: TBlock) => {
    if (includes(blockIds, block._id)) {
      removableBlockIds.push(block._id);
      return false;
    } else if (includes(removableBlockIds, block._parent)) {
      removableBlockIds.push(block._id);
      return false;
    } else {
      return true;
    }
  });
};

export const useRemoveBlocks = (): Function => {
  const dispatch = useDispatch();
  const presentBlocks = useAtomValue(presentBlocksAtom);
  const [ids, setSelectedIds] = useSelectedBlockIds();

  return useCallback(
    (blockIds: Array<string>) => {
      const parentBlockId = find(presentBlocks, { _id: blockIds[0] })?._parent || null;
      const newBlocks = removeBlocks(presentBlocks, blockIds);
      dispatch({ type: "set_blocks", payload: newBlocks });
      setSelectedIds(parentBlockId ? [parentBlockId] : []);
    },
    [presentBlocks, setSelectedIds, dispatch, ids],
  );
};
