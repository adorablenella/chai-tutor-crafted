// @ts-nocheck
import FlatToNested from "flat-to-nested";
import { each, filter, find, first, flatten, get, isEmpty, map, set } from "lodash";
import { BlockNode } from "../functions/Layers";

/**
 * THis is a very fragile code. Not automation tested but works perfectly
 * DO NOT EDIT this code without testing it first
 * @type {FlatToNested}
 */
const flatToNestedInstance = new FlatToNested({});

function getBlocksTree(blocks: BlockNode[]) {
  let elements = flatToNestedInstance.convert(blocks);
  elements =
    !elements.type && elements.children && elements.children.length
      ? elements.children
      : !isEmpty(elements)
      ? [elements]
      : [];
  return elements;
}

const nestedToFlatArray = (nestedJson: any, parent: any) =>
  flatten(
    nestedJson.map((block: BlockNode) => {
      // eslint-disable-next-line no-param-reassign
      block = parent ? { ...block, parent } : { ...block };
      if (block.children) {
        const children = [...block.children];
        // eslint-disable-next-line no-param-reassign
        delete block.children;
        return flatten([block, ...nestedToFlatArray(children, block._id)]);
      }
      return block;
    })
  );

function setProjectBlocksInMemory(nodes: any, initial = false) {
  for (let i = 0; i < nodes.length; i++) {
    const element = nodes[i];
    if (element.global && !initial) {
      // eslint-disable-next-line no-param-reassign
      nodes[i] = {
        type: "GlobalBlock",
        _parent: get(element, "parent", null),
        blockId: element.blockId,
        _id: element._id,
      };
    } else if (element.children && element.children.length) {
      setProjectBlocksInMemory(element.children);
    }
  }
}

function getInnerBlocks(flatArr: BlockNode[]) {
  let blocks: BlockNode[] = [];
  let pBlocks = filter(flatArr, { type: "GlobalBlock" });
  if (pBlocks.length > 0) {
    pBlocks = map(pBlocks, getPBlocks);
    each(pBlocks, (pBlock: BlockNode[]) => {
      blocks = [...blocks, ...getSingleBlock(pBlock)];
    });
  }
  return blocks;
}

function getSingleBlock(flatArray: BlockNode[]) {
  let blocks: BlockNode[] = [];
  const parent = get(first(flatArray), "parent", null);
  set(first(flatArray), "parent", null);
  const block = [flatToNestedInstance.convert(clone(flatArray))];
  setProjectBlocksInMemory(block, true);
  let flat = nestedToFlatArray(block, flatArray[0]._id);
  flat = set(flat, "0.parent", parent);
  blocks = [...blocks, flat, ...getInnerBlocks(flat)];

  return blocks;
}

function getPBlocks(block: BlockNode) {
  const rootBlock = find(FLAT_ARRAY, { _id: block._id });
  if (!rootBlock) return [];
  const blocks = [rootBlock];
  const children = filter(FLAT_ARRAY, { _parent: block._id });
  if (children.length) {
    return flatten([...blocks, ...flatten(map(children, getPBlocks))]);
  }
  return flatten(blocks);
}

const clone = (obj: any) => JSON.parse(JSON.stringify(obj));

let FLAT_ARRAY: BlockNode[] = [];

export function splitPageBlocks(allPageBlocks: any[]) {
  FLAT_ARRAY = allPageBlocks;
  const clonedTree = getBlocksTree(clone(allPageBlocks));
  setProjectBlocksInMemory(clonedTree);
  const pageBlocks = nestedToFlatArray(clonedTree, null);
  const globalBlocks = getInnerBlocks(pageBlocks);
  const mappedBlocks = {};
  each(globalBlocks, (projectBlock: BlockNode) => set(mappedBlocks, first(projectBlock).blockId, projectBlock));
  return [pageBlocks, mappedBlocks];
}
