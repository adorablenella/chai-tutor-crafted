import { atom, useAtom } from "jotai";
import { without, includes } from "lodash";
import { useCallback } from "react";

const hiddenBlockIdsAtom = atom<Array<string>>([]);

export const useHiddenBlockIds = (): [Array<string>, Function, Function] => {
  const [blockIds, setBlockIds] = useAtom(hiddenBlockIdsAtom);

  const toggleHidden = useCallback(
    (blockId: string) => {
      setBlockIds((prevIds) => (includes(prevIds, blockId) ? without(prevIds, blockId) : [...prevIds, blockId]));
    },
    [setBlockIds]
  );

  return [blockIds, setBlockIds, toggleHidden];
};
