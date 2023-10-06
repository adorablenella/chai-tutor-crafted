"use client";

import "../../custom-blocks/Navbar";

import { CLIENT_BLOCKS } from "@/sdk/next/CLIENT_BLOCKS";
import React, { useCallback } from "react";
import { get, isString, memoize, omit } from "lodash";
import { TBlock } from "@/sdk/package/types/TBlock";
import { STYLES_KEY } from "@/sdk/package/constants/CONTROLS";
import { twMerge } from "tailwind-merge";

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

export const ClientWrapper = (block: TBlock) => {
  const getStyles = useCallback((block: TBlock) => getStyleAttrs(block), []);
  const blockDefinition = get(CLIENT_BLOCKS, block._type, false);
  if (!blockDefinition) {
    return null;
  }
  const syncedBlock = { ...(blockDefinition as any).defaults, ...block };
  const props: Record<string, any> = omit(
    {
      blockProps: {},
      ...syncedBlock,
      ...getStyles(syncedBlock),
    },
    ["_parent", "_name"],
  );
  return React.createElement(blockDefinition.component, props as any);
};
