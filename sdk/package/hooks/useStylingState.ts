import { useAtom } from "jotai";
import { styleStateAtom } from "./useSelectedBlockIds";

export const useStylingState = () => useAtom(styleStateAtom);
