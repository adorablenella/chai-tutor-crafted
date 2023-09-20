import { atom, useAtom } from "jotai";

export const builderModeAtom = atom("view");

export const useBuilderMode = () => useAtom(builderModeAtom);
