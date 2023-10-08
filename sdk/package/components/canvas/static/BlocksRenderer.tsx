import React, { useCallback } from "react";
import { filter, find, includes, isEmpty, isString, memoize, omit } from "lodash";
import { twMerge } from "tailwind-merge";
import { useThrottledCallback } from "@react-hookz/web";
import { TBlock } from "../../../types/TBlock";
import { SLOT_KEY, STYLES_KEY } from "../../../constants/CONTROLS";
import { TStyleAttrs } from "../../../types/index";
import { useAllBlocks, useHighlightBlockId } from "../../../hooks";
import { getBlockComponent } from "../../../blocks/builder-blocks";

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

export function BlocksRendererStatic({ blocks }: { blocks: TBlock[] }) {
  const allBlocks = useAllBlocks();
  const [, setHighlightedId] = useHighlightBlockId();

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
          if (includes(["Box", "Row", "Column", "DataContext", "Slot", "Link", "List", "ListItem"], block._type)) {
            const childBlocks = filter(allBlocks, { _parent: block._id });
            attrs.children = childBlocks.length ? <BlocksRendererStatic blocks={childBlocks} /> : null;
          }

          return React.createElement(
            getBlockComponent(block._type),
            omit({
              blockProps: { "data-block-id": block._id, "data-block-type": block._type },
              ...block,
              index,
              ...getStyles(block),
              ...attrs,
            }),
          );
        }),
      )}
    </>
  );
}
