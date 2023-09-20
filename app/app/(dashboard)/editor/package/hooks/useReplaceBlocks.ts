import { useAtomValue } from "jotai";
import { useCallback } from "react";
import { find } from "lodash";
import { presentBlocksAtom } from "../store/blocks";
import { useDispatch } from "./useTreeData";
import { generateUUID } from "../functions/functions";
import { useSelectedBlockIds } from "./useSelectedBlockIds";
import { TBlock } from "../types/TBlock";

function regenerateRandomIds(blocks: TBlock[]) {
  const updatedBlocks: TBlock[] = [];
  const idMapping: any = {};

  blocks.forEach((block) => {
    const updatedBlock: any = { ...block };

    if (block.parent) {
      // Update parent ID using the mapping
      updatedBlock._parent = idMapping[block.parent];
    }

    if (block.id) {
      const newId = generateUUID();
      updatedBlock._id = newId;
      // Store the mapping between old and new IDs
      idMapping[block._id] = newId;
    }

    updatedBlocks.push(updatedBlock);
  });

  return updatedBlocks;
}

export const replaceBlockAndSetParent = (blockToReplace: string, existingBlocks: TBlock[], newBlocks: TBlock[]) => {
  // Recursive function to remove blocks with the given parent ID
  const removeChildBlocks = (parentId: string) => {
    const childBlocks = existingBlocks.filter((block) => block._parent === parentId);
    childBlocks.forEach((childBlock: TBlock) => {
      removeChildBlocks(childBlock._id);
      const childIndex = existingBlocks.findIndex((block) => block._id === childBlock._id);
      existingBlocks.splice(childIndex, 1);
    });
  };

  // Find the index of the block object to replace in the existing blocks array
  const index = existingBlocks.findIndex((block) => block._id === blockToReplace);

  if (index !== -1) {
    const block = find(existingBlocks, { _id: blockToReplace }) as TBlock;
    // Set the parent of the first new block element to be the same as the block to replace
    // eslint-disable-next-line no-param-reassign
    newBlocks[0]._parent = block._parent;

    // Find the index where the new blocks should be inserted
    const insertionIndex = existingBlocks.findIndex((b) => b._id === blockToReplace);

    // Remove the block to replace and its child blocks from the existing blocks array
    removeChildBlocks(blockToReplace);
    existingBlocks.splice(index, 1);

    // Insert the new blocks at the correct position
    if (insertionIndex !== -1) {
      existingBlocks.splice(insertionIndex, 0, ...newBlocks);
    } else {
      existingBlocks.push(...newBlocks);
    }
  }

  return existingBlocks;
};

export const useReplaceBlocks = () => {
  const currentBlocks = useAtomValue(presentBlocksAtom) as TBlock[];
  const dispatch = useDispatch();
  const [, setSelectedIds] = useSelectedBlockIds();
  const replaceBlocks = useCallback(
    (blockId: string, newBlocks: TBlock[]) => {
      // change the id of all new blocks with generateUUID function
      // eslint-disable-next-line no-param-reassign
      newBlocks = regenerateRandomIds(newBlocks);
      const newBlockList = replaceBlockAndSetParent(blockId, currentBlocks, newBlocks);
      dispatch({ type: "set_blocks", payload: [...newBlockList] });
      setSelectedIds([newBlocks[0]._id]);
    },
    [currentBlocks]
  );

  return [replaceBlocks];
};
