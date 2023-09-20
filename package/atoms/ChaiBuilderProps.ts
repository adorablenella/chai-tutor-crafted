import { atom } from "jotai";
import { ChaiBuilderProviderProps } from "../types";

export const chaiBuilderPropsAtom = atom<Omit<
  ChaiBuilderProviderProps,
  "blocks" | "globalBlocks" | "brandingOptions"
> | null>(null);
chaiBuilderPropsAtom.debugLabel = "chaiBuilderPropsAtom";

export const apiKeyAtom = atom<string | null>(null);
apiKeyAtom.debugLabel = "apiKeyAtom";
