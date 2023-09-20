import { atom, useAtom, useSetAtom } from "jotai";
import { useCallback } from "react";
import { cutBlockIdsAtom } from "./useCutBlockIds";

export const copiedBlockIdsAtom: any = atom<Array<string>>([]);

export const useCopyBlockIds = (): [Array<string>, Function] => {
  const [ids, setIds] = useAtom(copiedBlockIdsAtom);
  const resetCutBlockIds = useSetAtom(cutBlockIdsAtom);

  const setCopiedBlockIds = useCallback(
    (blockIds: Array<string>) => {
      setIds(blockIds);
      resetCutBlockIds([]);
    },
    [setIds, resetCutBlockIds]
  );
  return [ids as string[], setCopiedBlockIds];
};
