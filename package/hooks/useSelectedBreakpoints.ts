import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const selectedBreakpointsAtom = atomWithStorage("selectedBreakpoints", ["XS", "MD", "XL"]);

export const useSelectedBreakpoints = (): [string[], Function] => {
  const [selectedBreakpoints, setSelectedBreakpoints] = useAtom(selectedBreakpointsAtom);
  return [selectedBreakpoints, setSelectedBreakpoints];
};
