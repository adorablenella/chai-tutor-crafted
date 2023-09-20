import { useAtomValue } from "jotai";
import { useCallback, useMemo } from "react";
import { includes, isEmpty, map, set } from "lodash";
import { useDuplicateBlocks } from "./useDuplicateBlocks";
import { useDispatch } from "./useTreeData";
import { copiedBlockIdsAtom } from "./useCopyBlockIds";
import { useCutBlockIds } from "./useCutBlockIds";
import { presentBlocksAtom } from "../store/blocks";
import { BlockNode } from "../functions/Layers";

const useMoveCutBlocks = () => {
  const presentBlocks = useAtomValue(presentBlocksAtom);
  const dispatch = useDispatch();
  return useCallback(
    (blockIds: Array<string>, newParentId: string) => {
      const newBlocks = map(presentBlocks, (block: BlockNode) => {
        if (includes(blockIds, block.id)) {
          set(block, "parent", newParentId);
        }
        return block;
      });
      dispatch({ type: "set_blocks", payload: newBlocks });
    },
    [presentBlocks, dispatch]
  );
};

export const usePasteBlocks = (): {
  canPaste: boolean;
  pasteBlocks: Function;
} => {
  // @ts-ignore
  const copiedBlockIds: Array<string> = useAtomValue(copiedBlockIdsAtom);
  const [cutBlockIds, setCutBlockIds] = useCutBlockIds();
  const duplicateBlocks = useDuplicateBlocks();
  const moveCutBlocks = useMoveCutBlocks();
  const canPaste = useMemo<boolean>(
    () => cutBlockIds.length > 0 || copiedBlockIds.length > 0,
    [copiedBlockIds, cutBlockIds]
  );
  return {
    canPaste,
    pasteBlocks: useCallback(
      (newParentId: string) => {
        if (!isEmpty(copiedBlockIds)) {
          duplicateBlocks(copiedBlockIds, newParentId);
        } else {
          moveCutBlocks(cutBlockIds, newParentId);
        }
        setCutBlockIds(() => []);
      },
      [cutBlockIds, copiedBlockIds, duplicateBlocks, moveCutBlocks, setCutBlockIds]
    ),
  };
};
