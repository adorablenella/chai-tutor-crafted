import { TBlock } from "@/sdk/package/types/TBlock";
import { findIndex } from "lodash";

export function insertBlockAtIndex(
  arr: TBlock[],
  parentId: string | null,
  destinationIndex: number,
  newBlocks: TBlock[],
) {
  // @ts-ignore
  const parentIndex = findIndex(arr, { _parent: parentId });
  const insertIndex = (parentIndex === -1 ? 0 : parentIndex) + destinationIndex;
  // add the new blocks array to the original array at the correct index
  arr.splice(insertIndex, 0, ...newBlocks);
  return arr;
}
