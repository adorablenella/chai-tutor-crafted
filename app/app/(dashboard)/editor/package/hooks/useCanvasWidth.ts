import { atomWithStorage } from "jotai/utils";
import { atom, useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { getBreakpointValue } from "../functions/functions";
import { useStylingBreakpoint } from "./useStylingBreakpoint";

export const canvasWidthAtom = atomWithStorage("canvasWidth", 360);

export const canvasBreakpointAtom = atom((get) => {
  const width: number = get(canvasWidthAtom);
  return getBreakpointValue(width).toLowerCase();
});

/**
 *
 */
export const useCanvasWidth = (): [number, string, Function] => {
  const [currentWidth, setCanvasWidth] = useAtom(canvasWidthAtom);
  const breakpoint = useAtomValue(canvasBreakpointAtom);
  const [stylingBreakpoint, setStylingBreakpoint] = useStylingBreakpoint();

  useEffect(() => {
    if (stylingBreakpoint !== "xs") {
      setStylingBreakpoint(breakpoint);
    }
  }, [breakpoint, stylingBreakpoint, setStylingBreakpoint]);

  return [currentWidth, breakpoint, setCanvasWidth];
};
