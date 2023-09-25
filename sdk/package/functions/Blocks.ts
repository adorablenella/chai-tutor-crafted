import FlatToNested from "flat-to-nested";
import { each, filter, find, flatten, get, isEmpty, isString, map, omit, set } from "lodash";
import { generateUUID } from "./functions";
import { builderBlocksAtom, builderStore } from "../store";
import { TBlock } from "../types/TBlock";

const flatToNestedInstance = new FlatToNested({ children: "blockNodes" });

export const nestedToFlatArray = (nestedJson: Array<TBlock>, parent: string | null = null): Array<TBlock> =>
  flatten(
    nestedJson.map((block: any) => {
      // eslint-disable-next-line no-param-reassign
      block = parent !== null ? { ...block, parent } : block;
      if (block.children && block.children.length) {
        const children = [...block.children];
        // eslint-disable-next-line no-param-reassign
        delete block.children;
        return flatten([block, ...nestedToFlatArray(children, block._id)]);
      }
      return block;
    }),
  );

export function duplicateBlocks(blocks: Array<TBlock>, id: string, _parent: string | null): Array<TBlock> {
  const children = filter(blocks, (c) => c._parent === id);
  const newBlocks: Array<any> = [];
  for (let i = 0; i < children.length; i++) {
    const slots = getSlots(children[i]);
    if (Object.keys(slots).length > 0) {
      Object.keys(slots).forEach((key) => {
        children[i][key] = `slot:${generateUUID()}`;
      });
    }
    if (filter(blocks, { _parent: children[i]._id }).length > 0) {
      const newId = generateUUID();
      newBlocks.push({ ...children[i], oldId: children[i]._id, ...{ _id: newId, _parent } });
      newBlocks.push(flatten(duplicateBlocks(blocks, children[i]._id, newId)));
    } else {
      newBlocks.push({
        ...children[i],
        oldId: children[i]._id,
        ...{ _id: generateUUID(), _parent },
      });
    }
  }
  return flatten(newBlocks);
}

export function getBlocksTree(blocks: TBlock[]) {
  let elements: any = flatToNestedInstance.convert(blocks.map((block) => omit(block, ["settings"])));
  elements = !elements.type && elements.blockNodes ? elements.blockNodes : !isEmpty(elements) ? [elements] : [];
  return elements;
}

// eslint-disable-next-line no-underscore-dangle
export const hasChildren = (node: any): boolean => node.blockNodes && node.blockNodes.length > 0;

export const getBlockComponent = (type: string): any => {
  const blocks = builderStore.get(builderBlocksAtom);
  return get(blocks[type], "component", () => "Undefined");
};

export const getSlots = (block: TBlock) => {
  // loop over all keys and find the ones that start with slot
  const slots: any = {};
  Object.keys(block).forEach((key) => {
    // @ts-ignore
    if (isString(block[key]) && block[key].startsWith("slot")) {
      // @ts-ignore
      slots[key] = block[key].replace("slot:", "");
    }
  });
  return slots;
};

/**
 * Return the cloned array of blocks
 * @param currentBlocks
 * @param id
 * @param newParentId
 */
export const getDuplicatedBlocks = (
  currentBlocks: TBlock[],
  id: string,
  newParentId: string | null = null,
): TBlock[] => {
  let block = find(currentBlocks, { _id: id }) as TBlock;
  // @ts-ignore
  block = { ...block, oldId: block._id, _id: generateUUID() };

  if (newParentId) {
    // @ts-ignore
    block = { ...block, _parent: newParentId };
  }

  const blocks: TBlock[] = [block];

  if (filter(currentBlocks, { _parent: id }).length > 0) {
    // @ts-ignore
    blocks.push(flatten(duplicateBlocks(currentBlocks, id, block._id)));
  }

  const newBlocks = flatten(blocks);
  return map(newBlocks, (m: TBlock) => {
    const newBlock = m;
    const slots = getSlots(newBlock);
    if (Object.keys(slots).length > 0) {
      Object.keys(slots).forEach((key) => {
        const slotBlock = find(newBlocks, { oldId: slots[key].replace("slot:", "") }) as TBlock;
        newBlock[key] = `slot:${slotBlock._id}`;
      });
    }
    return omit(newBlock, ["global", "oldId"]);
  }) as TBlock[]; // remove all global blocks if any
};

/**
 * Important Function. Merges the global blocks into page blocks
 * @param globalBlocks
 * @param pageBlocks
 * @returns {*[]}
 */
export function mergeGlobalBlockIntoPageBlocks(globalBlocks: Array<any>, pageBlocks: Array<TBlock>) {
  let newBlocks: Array<TBlock> = [];
  each(pageBlocks, (pageBlock: TBlock) => {
    if (pageBlock.type === "ProjectBlock") {
      const projectBlocks = get(find(globalBlocks, { block_id: pageBlock.blockId }), "blocks", []);
      if (projectBlocks.length) {
        set(projectBlocks, "0._parent", pageBlock.parent);
        newBlocks = flatten([...newBlocks, ...mergeGlobalBlockIntoPageBlocks(globalBlocks, projectBlocks)]);
      } else {
        newBlocks = [...newBlocks, ...projectBlocks];
      }
    } else {
      newBlocks.push(pageBlock);
    }
  });
  return newBlocks;
}
