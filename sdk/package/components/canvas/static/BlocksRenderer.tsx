import React, { useCallback } from "react";
import { filter, find, get, isEmpty, isString, memoize } from "lodash";
import { twMerge } from "tailwind-merge";
import { TBlock } from "../../../types/TBlock";
import { SLOT_KEY, STYLES_KEY } from "../../../constants/CONTROLS";
import { TStyleAttrs } from "../../../types/index";
import { useAllBlocks, useHighlightBlockId, useSelectedBlockIds } from "../../../hooks";
import { getBlockComponent } from "../../../blocks/builder-blocks";
import { useSelectedStylingBlocks } from "@/sdk/package/hooks/useSelectedStylingBlocks";

// FIXME:  Duplicate code in CanvasRenderer.tsx
const getSlots = (block: TBlock) => {
  // loop over all keys and find the ones that start with slot
  const slots: { [key: string]: string[] } = {};
  Object.keys(block).forEach((key) => {
    if (isString(block[key]) && block[key].startsWith(SLOT_KEY)) {
      slots[key] = block[key].replace(SLOT_KEY, "").split(",");
    }
  });
  return slots;
};

const generateClassNames = memoize((styles: string) => {
  const stylesArray = styles.replace(STYLES_KEY, "").split(",");
  return twMerge(stylesArray[0], stylesArray[1]);
});

function getElementAttrs(block: TBlock, key: string) {
  return get(block, `${key}_attrs`, {}) as Record<string, string>;
}

function getStyleAttrs(block: TBlock, onMouseEnter: any, onMouseLeave: any, onClick: any) {
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
        onClick,
        ...getElementAttrs(block, key),
      };
    }
  });
  return styles;
}

export function BlocksRendererStatic({ blocks }: { blocks: TBlock[] }) {
  const allBlocks = useAllBlocks();
  const [, setHighlightedId] = useHighlightBlockId();
  const [, setStyleBlockIds] = useSelectedStylingBlocks();
  const [, setIds] = useSelectedBlockIds();

  const onMouseEnter = useCallback(
    (e: any) => {
      const styleId: string | null = e.currentTarget?.getAttribute("data-style-id");
      setHighlightedId(styleId || "");
      e.stopPropagation();
    },
    [setHighlightedId],
  );

  const onMouseLeave = useCallback(
    (e: any) => {
      setHighlightedId("");
      e.stopPropagation();
    },
    [setHighlightedId],
  );
  const onClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      const currentTarget = e.currentTarget;
      if (currentTarget.getAttribute("data-block-parent")) {
        // check if target element has data-styles-prop attribute
        const styleProp = currentTarget.getAttribute("data-style-prop") as string;
        const styleId = currentTarget.getAttribute("data-style-id") as string;
        const blockId = currentTarget.getAttribute("data-block-parent") as string;
        setStyleBlockIds([{ id: styleId, prop: styleProp, blockId }]);
        setIds([blockId]);
      } else if (currentTarget.getAttribute("data-block-id")) {
        setIds([currentTarget.getAttribute("data-block-id")]);
        if (currentTarget.getAttribute("data-block-parent")) {
          const styleProp = currentTarget.getAttribute("data-style-prop") as string;
          const styleId = currentTarget.getAttribute("data-style-id") as string;
          const blockId = currentTarget.getAttribute("data-block-parent") as string;
          setStyleBlockIds([{ id: styleId, prop: styleProp, blockId }]);
        }
      }
    },
    [setStyleBlockIds, setIds],
  );

  const getStyles = useCallback(
    (block: TBlock) => getStyleAttrs(block, onMouseEnter, onMouseLeave, onClick),
    [onMouseEnter, onMouseLeave],
  );

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
                  <BlocksRendererStatic blocks={[find(allBlocks, { _id: slotId }) as TBlock]} />
                )),
              );
            });
          }
          const childBlocks = filter(allBlocks, { _parent: block._id });
          attrs.children = childBlocks.length ? <BlocksRendererStatic blocks={childBlocks} /> : null;

          return React.createElement(getBlockComponent(block._type), {
            blockProps: { onClick, "data-block-id": block._id, "data-block-type": block._type },
            ...block,
            index,
            ...getStyles(block),
            ...attrs,
            inBuilder: true,
          });
        }),
      )}
    </>
  );
}
