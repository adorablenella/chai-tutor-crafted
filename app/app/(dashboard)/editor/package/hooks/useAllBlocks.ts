import { useAtomValue } from "jotai";
import { presentBlocksAtom } from "../store/blocks";
import { TBlock } from "../types/TBlock";

/**
 * useTreeData hook
 */
export const useAllBlocks = (): TBlock[] => useAtomValue(presentBlocksAtom);
