import React, { useCallback } from "react";
import {
  filter,
  find,
  get,
  includes,
  isArray,
  isEmpty,
  isNumber,
  isObject,
  isString,
  isUndefined,
  memoize,
  omit,
  set,
} from "lodash";
import { twMerge } from "tailwind-merge";
import { useAtom } from "jotai";
import { useThrottledCallback } from "@react-hookz/web";
import { getBlockComponent } from "../../functions/Blocks";
import { TBlock } from "../../types/TBlock";
import { canvasAllBlocksAtom, canvasGlobalDataAtom, canvasHighlightedBlockAtom } from "./framework/store";
import { TStyleAttrs } from "../../types";
import { GLOBAL_DATA_KEY, STYLES_KEY } from "../../constants/CONTROLS";

// FIXME:  Duplicate code in CanvasRenderer.tsx
const getSlots = (block: TBlock) => {
  // loop over all keys and find the ones that start with slot
  const slots: { [key: string]: string[] } = {};
  Object.keys(block).forEach((key) => {
    if (isString(block[key]) && block[key].startsWith("slots:")) {
      slots[key] = block[key].replace("slots:", "").split(",");
    }
  });
  return slots;
};

const generateClassNames = memoize((styles: string) => {
  const stylesArray = styles.replace(STYLES_KEY, "").split(",");
  return twMerge(stylesArray[0], stylesArray[1]);
});

function getStyleAttrs(block: TBlock, onMouseEnter: any, onMouseLeave: any) {
  const styles: { [key: string]: TStyleAttrs } = {};
  Object.keys(block).forEach((key) => {
    if (isString(block[key]) && block[key].startsWith(STYLES_KEY)) {
      const styleName = generateClassNames(block[key]);
      styles[key] = {
        className: styleName,
        "data-style-prop": key,
        "data-block-parent": block._id,
        "data-style-id": `${key}-${block._id}`,
        onMouseEnter,
        onMouseLeave,
      };
    }
  });
  return styles;
}

const isCorrectFormat = (data: any, dataType: string) => {
  if (dataType === "string") {
    return isString(data);
  }
  if (dataType === "number") {
    return isNumber(data);
  }
  if (dataType === "boolean") {
    return data === true || data === false;
  }
  if (dataType === "object") {
    return isObject(data);
  }
  if (dataType === "array") {
    return isArray(data);
  }
  return false;
};

function getGlobalDataAttrs(block: TBlock, globalData: { [key: string]: any }) {
  const globalDataAttrs: { [key: string]: any } = {};
  Object.keys(block).forEach((key) => {
    if (isString(block[key]) && block[key].startsWith(GLOBAL_DATA_KEY)) {
      const [, dataType, path] = block[key].split(":");
      const data = get(globalData, path);
      set(globalDataAttrs, key, isUndefined(data) ? "" : isCorrectFormat(data, dataType) ? data : undefined);
    }
  });
  return globalDataAttrs;
}

// function getLanguageTranslationAttrs(block: TBlock, globalData: { [key: string]: any }) {
//   const globalDataAttrs: { [key: string]: any } = {};
//   Object.keys(block).forEach((key) => {
//     if (isString(block[key]) && block[key].startsWith(I18N_KEY)) {
//       const [, dataType, path] = block[key].split(":");
//       const data = get(globalData, path);
//       set(globalDataAttrs, key, isUndefined(data) ? "" : isCorrectFormat(data, dataType) ? data : undefined);
//     }
//   });
//   return globalDataAttrs;
// }

export function BlocksRenderer({ blocks }: { blocks: TBlock[] }) {
  const [allBlocks] = useAtom(canvasAllBlocksAtom);
  const [globalData] = useAtom(canvasGlobalDataAtom);
  const [, setHighlightedId] = useAtom(canvasHighlightedBlockAtom);

  const onMouseMove = useThrottledCallback(
    (e: any) => {
      const styleId: string | null = e.currentTarget?.getAttribute("data-style-id");
      if (styleId) {
        setHighlightedId(styleId);
      } else {
        setHighlightedId("");
      }
      e.stopPropagation();
    },
    [setHighlightedId],
    100,
  );

  const onMouseLeave = useCallback(
    (e: any) => {
      setHighlightedId("");
      e.stopPropagation();
    },
    [setHighlightedId],
  );

  const getStyles = useCallback(
    (block: TBlock) => getStyleAttrs(block, onMouseMove, onMouseLeave),
    [onMouseMove, onMouseLeave],
  );

  const getGlobalData = useCallback((block: TBlock) => getGlobalDataAttrs(block, globalData), [globalData]);

  return (
    <>
      {React.Children.toArray(
        blocks.map((block: TBlock, index: number) => {
          const slots = getSlots(block);
          const attrs: any = {};
          if (!isEmpty(slots)) {
            Object.keys(slots).forEach((key) => {
              attrs[key] = React.Children.toArray(
                slots[key].map((slotId: string) => (
                  <BlocksRenderer blocks={[find(allBlocks, { _id: slotId }) as TBlock]} />
                )),
              );
            });
          }
          if (includes(["Box", "Row", "Column", "DataContext", "Slot", "Link", "List", "ListItem"], block._type)) {
            attrs.children = <BlocksRenderer blocks={filter(allBlocks, { _parent: block._id })} />;
          }

          return React.createElement(
            getBlockComponent(block._type),
            omit(
              {
                blockProps: { "data-block-id": block._id, "data-block-type": block._type },
                ...block,
                index,
                ...getGlobalData(block),
                ...getStyles(block),
                ...attrs,
              },
              ["_type", "_parent", "_name"],
            ),
          );
        }),
      )}
    </>
  );
}
