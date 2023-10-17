import { useCallback, useMemo } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import { filter, find, get as getProp, includes, isUndefined, map, without } from "lodash";
import { atomWithStorage } from "jotai/utils";
import { presentBlocksAtom } from "../store/blocks";
import { BlockNode } from "../functions/Layers";
import { TBlock } from "../types/TBlock";

/**
 * Core selected  ids atom
 */
const selectedBlockIdsAtom = atom<Array<string>>([]);
selectedBlockIdsAtom.debugLabel = "selectedBlockIdsAtom";

/**
 * Derived atoms
 */
const selectedBlocksAtom = atom<Array<string>>((get) => {
  const blocks = get(presentBlocksAtom);
  const blockIds = get(selectedBlockIdsAtom);
  return map(
    filter(blocks, ({ _id }: { _id: string }) => includes(blockIds, _id)),
    (block) => ({ ...block }),
  );
});
selectedBlocksAtom.debugLabel = "selectedBlocksAtom";

/**
 *
 */
export const selectedBlockAtom = atom((get) => {
  const blocks = get(selectedBlocksAtom);
  if (blocks.length === 0) {
    return null;
  }
  if (blocks.length === 1) {
    return blocks[0];
  }

  return {
    type: "Multiple",
    id: map(blocks, "id"),
  };
});
selectedBlockAtom.debugLabel = "selectedBlockAtom";

// FIXME: This is a hacky way to check if the selected blocks are flex children
const areFlexChild = (classes: string) => classes.match(/flex( |$)/g) !== null;
const areGridChild = (classes: string) => classes.match(/grid( |$)/g) !== null;
const getParentId = (block: BlockNode | {}) => getProp(block, "parent", null);

export const selectedBlocksParentsAtom = atom((get) => {
  const selectedBlocks = get(selectedBlocksAtom);
  const parentIds = map(selectedBlocks, getParentId);
  return filter(get(presentBlocksAtom), (block: TBlock) => includes(parentIds, block._id)) as TBlock[];
});
selectedBlocksParentsAtom.debugLabel = "selectedBlocksParentsAtom";

export const selectedBlockFlexChildAtom = atom((get) => {
  return false;
  // FIXME: Loop over keys to check if any key is styles and has flex in it
  // const styleBlock = first(get(selectedStylingBlocksAtom)) as TStyleBlock;
  // if (!styleBlock) {
  //   return false;
  // }
  // const block = find(get(presentBlocksAtom), { _id: styleBlock.blockId });
  // const parentBlock = find(get(presentBlocksAtom), { _id: block._parent });
  // if (!parentBlock) return false;
  // return areFlexChild(getProp(parentBlock, styleBlock.prop, `${STYLES_KEY},`));
});
selectedBlockFlexChildAtom.debugLabel = "selectedBlockFlexChildAtom";

export const selectedBlockGridChildAtom = atom((get) => {
  return false;
  // FIXME: Loop over keys to check if any key is styles and has flex in it
  // const styleBlock = first(get(selectedStylingBlocksAtom)) as TStyleBlock;
  // if (!styleBlock) {
  //   return false;
  // }
  // const block = find(get(presentBlocksAtom), { _id: styleBlock.blockId });
  // const parentBlock = find(get(presentBlocksAtom), { _id: block._parent });
  // if (!parentBlock) return false;
  // return areGridChild(getProp(parentBlock, styleBlock.prop, `${STYLES_KEY},`));
});
selectedBlockGridChildAtom.debugLabel = "selectedBlockGridChildAtom";

export const styleStateAtom: any = atom<string>("");
styleStateAtom.debugLabel = "styleStateAtom";

export const styleBreakpointAtom = atomWithStorage<string>("styleBreakpoint", "xs");
styleBreakpointAtom.debugLabel = "styleBreakpointAtom";

/**
 * Hook to get selected block ids
 */
export const useSelectedBlocksDisplayChild = () => ({
  flexChild: useAtomValue(selectedBlockFlexChildAtom),
  gridChild: useAtomValue(selectedBlockGridChildAtom),
});

/**
 * useSelectedBlock hook
 */
export const useSelectedBlock = () => useAtomValue(selectedBlockAtom);

/**
 * TODO: Add test cases for this hook
 */
export const useSelectedBlockHierarchy = () => {
  const [ids] = useSelectedBlockIds();
  const blocks = useAtomValue(presentBlocksAtom);
  const hierarchy = useMemo<TBlock[]>(() => {
    const nestedBlocks: TBlock[] = [find(blocks, (block) => block._id === ids[0])];
    let parent: string | undefined | null = getProp(nestedBlocks[0], "_parent");
    while (parent) {
      const parentBlock: TBlock = find(blocks, { id: parent }) as TBlock;
      nestedBlocks.push(parentBlock);
      parent = getProp(parentBlock, "_parent");
    }
    return nestedBlocks;
  }, [ids, blocks]);

  if (ids.length > 1) return [];
  return filter(hierarchy, (block) => !isUndefined(block));
};

/**
 *
 */
export const useSelectedBlockIds = (): [Array<string>, Function, Function] => {
  const [blockIds, setBlockIds] = useAtom(selectedBlockIdsAtom);

  const toggleSelectedBlockId = useCallback(
    (blockId: string) => {
      setBlockIds((prevIds) => {
        const newBlockIds: Array<string> = includes(prevIds, blockId)
          ? without(prevIds, blockId)
          : [...prevIds, blockId];

        return newBlockIds;
      });
    },
    [setBlockIds],
  );

  return [blockIds, setBlockIds, toggleSelectedBlockId];
};
