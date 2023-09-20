import { atom, useAtom } from "jotai";

/**
 *
 */
const activePanelAtom = atom<string>("");

/**
 *
 */
const parentBlockIdAtom = atom<string | null>(null);

/**
 *
 */
export const useActivePanel = () => useAtom(activePanelAtom);

/**
 *
 */
export const useAddBlockParent = () => useAtom(parentBlockIdAtom);
