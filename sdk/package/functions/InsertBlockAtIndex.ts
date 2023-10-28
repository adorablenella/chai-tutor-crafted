import { TBlock } from "@/sdk/package/types/TBlock";
import { filter, findIndex, isEmpty, last } from "lodash";

export function insertBlockAtIndex(
  allBlocks: TBlock[],
  parentId: string | null,
  destinationIndex: number | null,
  newBlocks: TBlock[],
  allowChildren: boolean,
) {
  // if the parent doesn't exist, just add the new blocks to the end of the array
  if (parentId === null) {
    return [...allBlocks, ...newBlocks];
  }

  // otherwise, find the index of the parent and add the destination index to it
  if (destinationIndex !== null) {
    // @ts-ignore
    const parentIndex = findIndex(allBlocks, { _parent: parentId });
    const insertIndex = (parentIndex === -1 ? 0 : parentIndex) + destinationIndex;
    // add the new blocks array to the original array at the correct index
    allBlocks.splice(insertIndex, 0, ...newBlocks);
    return allBlocks;
  }

  if (!allowChildren) {
    const index = findIndex(allBlocks, { _id: parentId });
    // if the destination index is null, just add the new blocks next to current selection
    const insertIndex = index + 1;
    // add the new blocks array to the original array at the correct index
    allBlocks.splice(insertIndex, 0, ...newBlocks);
    return allBlocks;
  }

  let lastIndex = findIndex(allBlocks, { _id: parentId });
  const childBlocks = filter(allBlocks, { _parent: parentId });
  if (!isEmpty(childBlocks)) {
    lastIndex = findIndex(allBlocks, { _id: last(childBlocks)!._id });
  }
  const insertIndex = lastIndex + 1;
  allBlocks.splice(insertIndex, 0, ...newBlocks);
  return allBlocks;
}
