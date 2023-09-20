import { atom, getDefaultStore } from "jotai";
import React from "react";
import { TBlock } from "../types/TBlock";

/**
 * Jotai store for global state management
 */
export const builderStore = getDefaultStore();

type BuilderBlock = {
  component: React.FC<TBlock>;
  group: string;
  icon?: any;
  label?: string;
  props?: any;
  type: string;
};
export const builderBlocksAtom = atom<{ [key: string]: BuilderBlock }>({});
