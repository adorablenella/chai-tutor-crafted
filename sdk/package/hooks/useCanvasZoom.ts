import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";

export const canvasZoomAtom = atomWithStorage<number>("canvasZoom", 100);

/**
 * Wrapper hook around useAtom
 */
export const useCanvasZoom = () => useAtom(canvasZoomAtom);
