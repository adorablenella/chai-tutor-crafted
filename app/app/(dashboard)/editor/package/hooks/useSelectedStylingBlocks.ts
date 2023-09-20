import { atom, useAtom } from "jotai";

export type TStyleBlock = {
  blockId: string;
  id: string;
  prop: string;
};

/**
 * Core selected  ids atom
 */
export const selectedStylingBlocksAtom = atom<TStyleBlock[]>([]);
selectedStylingBlocksAtom.debugLabel = "selectedStylingBlocksAtom";

/**
 *
 */
export const useSelectedStylingBlocks = () => useAtom(selectedStylingBlocksAtom);
