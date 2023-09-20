import { atom, useAtom, useSetAtom } from "jotai";
import { useCallback } from "react";
import { copiedBlockIdsAtom } from "./useCopyBlockIds";

export const cutBlockIdsAtom: any = atom<Array<string>>([]);

export const useCutBlockIds = (): [Array<string>, Function] => {
  const [ids, setIds] = useAtom(cutBlockIdsAtom);
  const resetCopyIds = useSetAtom(copiedBlockIdsAtom);

  const setCutBlockIds = useCallback(
    (blockIds: Array<string>) => {
      setIds(blockIds);
      resetCopyIds([]);
    },
    [setIds, resetCopyIds]
  );

  return [ids as string[], setCutBlockIds];
};
