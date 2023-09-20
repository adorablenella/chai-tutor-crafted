import { useAtomValue } from "jotai";
import { builderBlocksAtom } from "../store";

export const useCoreBlocks = () => useAtomValue(builderBlocksAtom);
