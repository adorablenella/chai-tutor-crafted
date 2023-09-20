import { useAtom } from "jotai";
import { styleBreakpointAtom } from "./useSelectedBlockIds";

export const useStylingBreakpoint = () => useAtom(styleBreakpointAtom);
