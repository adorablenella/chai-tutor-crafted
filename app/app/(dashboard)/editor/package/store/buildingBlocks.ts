import { atom } from "jotai";
import { filter, has } from "lodash";
import { CoreBlock } from "../blocks/types";

export const buildingBlocksAtom: any = atom<Array<CoreBlock | any>>([]);
buildingBlocksAtom.debugLabel = "buildingBlocksAtom";

export const globalBlocksAtom = atom<Array<any>>((get) => {
  const globalBlocks = get(buildingBlocksAtom) as Array<any>;
  return filter(globalBlocks, (block) => has(block, "blockId"));
});
