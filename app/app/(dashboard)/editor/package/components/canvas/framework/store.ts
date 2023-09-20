import { atom, createStore } from "jotai";
import { BRANDING_OPTIONS_DEFAULTS } from "../../../constants/MODIFIERS";
import { TBlock } from "../../../types/TBlock";

export const canvasStore = createStore();

export const canvasModelAtom = atom<"section" | "page">("page");

export const canvasAllBlocksAtom = atom<TBlock[]>([]);

export const canvasTranslationsAtom = atom<any[]>([]);

export const canvasProjectSettingsAtom = atom(BRANDING_OPTIONS_DEFAULTS);

export const canvasSelectedBlockIdsAtom = atom<string[]>([]);

export const canvasSelectedStylingBlockIdsAtom = atom<string[]>([]);

export const canvasSelectedBlockAtom = atom<TBlock | null>(null);
export const canvasHighlightedBlockAtom = atom<string>("");

export const canvasDarkModeAtom = atom<boolean>(false);

export const canvasRenderModeAtom = atom<"builder" | "live">("live");

export const canvasGlobalDataAtom = atom<{ [key: string]: any }>({});
