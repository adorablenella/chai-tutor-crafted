import { useCallback } from "react";
import { atom, useSetAtom } from "jotai";
import { each, filter, first, get as getProp, includes } from "lodash";
import { pageBlocksAtomsAtom } from "../store/blocks";
import { useDispatch } from "./useTreeData";
import { selectedStylingBlocksAtom, TStyleBlock } from "./useSelectedStylingBlocks";
import { TBlock } from "../types/TBlock";
import { getSplitClasses } from "../helpers/general";
import { STYLES_KEY } from "../constants/CONTROLS";

export const removeClassFromBlocksAtom: any = atom(null, (get, _set, { blockIds, fullClasses, dispatch }) => {
  const styleBlock = first(get(selectedStylingBlocksAtom)) as TStyleBlock;
  const blockAtoms = filter(get(pageBlocksAtomsAtom), (blockAtom) =>
    // @ts-ignore
    blockIds.includes(get(blockAtom)._id)
  );

  each(blockAtoms, (blockAtom) => {
    const block: TBlock = get(blockAtom as any);
    const nonDynamicClasses: string[] = fullClasses;
    // eslint-disable-next-line prefer-const
    let { classes, baseClasses } = getSplitClasses(getProp(block, styleBlock.prop, "styles:,"));

    each(nonDynamicClasses, (fullCls: string) => {
      const regEx = new RegExp(`(^| )${fullCls.replace("[", "\\[").replace("]", "\\]")}($| )`, "g");
      classes = classes.replace(regEx, " ").replace(/  +/g, " ").trim();
      const mq = first(fullCls.split(":"));
      if (includes(["2xl", "xl", "lg", "md", "sm"], mq)) {
        nonDynamicClasses.push((fullCls.split(":").pop() as string).trim());
      }
    });

    each(nonDynamicClasses, (fullCls: string) => {
      const regEx = new RegExp(`(^| )${fullCls.replace("[", "\\[").replace("]", "\\]")}($| )`, "g");
      baseClasses = baseClasses.replace(regEx, " ").replace(/  +/g, " ").trim();
    });

    dispatch({
      type: "update_props_realtime",
      payload: {
        ids: [block._id],
        props: {
          [styleBlock.prop]: `${STYLES_KEY}${baseClasses},${classes}`,
        },
      },
    });
  });
});

export const useRemoveClassesFromBlocks = (): Function => {
  const dispatch = useDispatch();
  const removeClassesFromBlocks = useSetAtom(removeClassFromBlocksAtom);
  return useCallback(
    (blockIds: Array<string>, fullClasses: Array<string>) => {
      removeClassesFromBlocks({ blockIds, fullClasses, dispatch });
      setTimeout(() => dispatch({ type: "create_snapshot" }));
    },
    [dispatch, removeClassesFromBlocks]
  );
};
