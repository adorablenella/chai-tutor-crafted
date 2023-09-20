import { atom } from "jotai";
import { atomWithReducer, splitAtom } from "jotai/utils";
import { getBlocksTree } from "../functions/Blocks";
import { pageBlocksReducer } from "./reducer";

export const pageBlocksAtom: any = atomWithReducer(
  {
    past: [],
    present: [],
    future: [],
  },
  pageBlocksReducer
);
pageBlocksAtom.debugLabel = "pageBlocksAtom";

// derived atoms
// @ts-ignore
export const presentBlocksAtom = atom((get) => get(pageBlocksAtom)?.present);
presentBlocksAtom.debugLabel = "presentBlocksAtom";
export const pageBlocksAtomsAtom = splitAtom(presentBlocksAtom);
pageBlocksAtomsAtom.debugLabel = "pageBlocksAtomsAtom";

export const pageBlocksTreeAtom = atom((get) => getBlocksTree(get(presentBlocksAtom)));
pageBlocksTreeAtom.debugLabel = "pageBlocksTreeAtom";

export const builderActivePageAtom = atom<string>("");
builderActivePageAtom.debugLabel = "builderActivePageAtom";
