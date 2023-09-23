import React, { useCallback, useContext } from "react";
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
import { TBlock } from "../types/TBlock";
import { LiveRenderContext } from "./LiveRenderContext";
import { getBlockComponent } from "../functions/Blocks";
import { GLOBAL_DATA_KEY, STYLES_KEY } from "../constants/CONTROLS";

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

function getStyleAttrs(block: TBlock) {
  const styles: { [key: string]: { className: string } } = {};
  Object.keys(block).forEach((key) => {
    if (isString(block[key]) && block[key].startsWith(STYLES_KEY)) {
      const styleName = generateClassNames(block[key]);
      styles[key] = {
        className: styleName,
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

export function BlocksRendererLive({ blocks }: { blocks: TBlock[] }) {
  const {
    pageData: { blocks: allBlocks },
    globalData,
  } = useContext(LiveRenderContext);

  const getStyles = useCallback((block: TBlock) => getStyleAttrs(block), []);

  const getGlobalData = useCallback((block: TBlock) => getGlobalDataAttrs(block, globalData || {}), [globalData]);

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
                  <BlocksRendererLive blocks={[find(allBlocks, { _id: slotId }) as TBlock]} />
                )),
              );
            });
          }
          if (includes(["Box", "Row", "Column", "DataContext", "Slot", "Link", "List", "ListItem"], block._type)) {
            attrs.children = <BlocksRendererLive blocks={filter(allBlocks, { _parent: block._id })} />;
          }

          return React.createElement(
            getBlockComponent(block._type),
            omit(
              {
                blockProps: {},
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
