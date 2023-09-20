import { useCallback } from "react";
import { atom, useSetAtom } from "jotai";
import { each, filter, first, get as getProp } from "lodash";
import { useDispatch } from "./useTreeData";
import { pageBlocksAtomsAtom } from "../store/blocks";
import { getNewClasses } from "../functions/GetNewClasses";
import { selectedStylingBlocksAtom, TStyleBlock } from "./useSelectedStylingBlocks";
import { TBlock } from "../types/TBlock";
import { STYLES_KEY } from "../constants/CONTROLS";

const getSplitClasses = (classesString: string) => {
  const splitClasses: string[] = classesString.replace(STYLES_KEY, "").split(",");
  return { baseClasses: splitClasses[0], classes: splitClasses[1] };
};

type Created = {
  blockIds: Array<string>;
  dispatch: Function;
  newClasses: Array<string>;
};

/**
 * Core Styling function
 * @param blockIds
 * @param newClasses
 * @param dispatch
 */
export const addClassesToBlocksAtom: any = atom(null, (get, _set, { blockIds, newClasses, dispatch }: Created) => {
  // @ts-ignore
  const blockAtoms = filter(get(pageBlocksAtomsAtom), (blockAtom) =>
    // @ts-ignore
    blockIds.includes(get(blockAtom)._id)
  );
  const styleBlock = first(get(selectedStylingBlocksAtom)) as TStyleBlock;
  each(blockAtoms, (blockAtom) => {
    const block: TBlock = get(blockAtom as any);
    const classesString: string = getProp(block, styleBlock.prop, `${STYLES_KEY},`);
    const { baseClasses, classes } = getSplitClasses(classesString);
    dispatch({
      type: "update_props_realtime",
      payload: {
        ids: [block._id],
        props: { [styleBlock.prop]: `${STYLES_KEY}${getNewClasses(classes, baseClasses, newClasses)}` },
      },
    });
  });
});

export const useAddClassesToBlocks = (): Function => {
  const dispatch = useDispatch();
  const addClassesToBlocks = useSetAtom(addClassesToBlocksAtom);
  return useCallback(
    (blockIds: Array<string>, newClasses: Array<string>, history: boolean) => {
      addClassesToBlocks({ blockIds, newClasses, dispatch });
      if (history) {
        setTimeout(() => dispatch({ type: "create_snapshot" }), 500);
      }
    },
    [dispatch, addClassesToBlocks]
  );
};
