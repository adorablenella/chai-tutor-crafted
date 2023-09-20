import { useAtomValue } from "jotai";
import { filter, includes, without } from "lodash";
import { useCallback } from "react";
import { presentBlocksAtom } from "../store/blocks";
import { useDispatch } from "./useTreeData";
import { useSelectedBlockIds } from "./useSelectedBlockIds";
import { TBlock } from "../types/TBlock";

export const useRemoveBlocks = (): Function => {
  const dispatch = useDispatch();
  const presentBlocks = useAtomValue(presentBlocksAtom);
  const [ids, setSelectedIds] = useSelectedBlockIds();

  return useCallback(
    (blockIds: Array<string>) => {
      const newBlocks = filter(presentBlocks, (block: TBlock) => !includes(blockIds, block._id));
      dispatch({ type: "set_blocks", payload: newBlocks });
      // TODO: Clear all cut ids and copy ids
      setSelectedIds(without(ids, ...blockIds));
    },
    [presentBlocks, setSelectedIds, dispatch, ids]
  );
};
