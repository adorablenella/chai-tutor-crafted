import { useAtomValue } from "jotai";
import { filter, find, includes, isEmpty } from "lodash";
import { useCallback } from "react";
import { presentBlocksAtom } from "../store/blocks";
import { useDispatch } from "./useTreeData";
import { useSelectedBlockIds } from "./useSelectedBlockIds";
import { TBlock } from "../types/TBlock";

const removeBlocks = (blocks: TBlock[], blockIds: Array<string>): TBlock[] => {
  const _blockIds: Array<string> = [];
  const _blocks = filter(blocks, (block: TBlock) => {
    if (includes(blockIds, block._id) || includes(blockIds, block._parent)) {
      _blockIds.push(block._id);
      return false;
    }
    return true;
  });

  if (!isEmpty(_blockIds)) return removeBlocks(_blocks, _blockIds);
  return _blocks;
};

export const useRemoveBlocks = () => {
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
