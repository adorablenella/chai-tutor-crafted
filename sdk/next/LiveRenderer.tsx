import React from "react";
import { filter, find, get, includes, isEmpty, isString, memoize, omit } from "lodash";
import { twMerge } from "tailwind-merge";
import { TBlock } from "../package/types/TBlock";
import { STYLES_KEY } from "../package/constants/CONTROLS";
import { SERVER_BLOCKS } from "@/sdk/next/SERVER_BLOCKS";
import { ClientWrapper } from "@/sdk/next/ClientWrapper";

const getBlockComponent = (type: string): boolean | { component: React.FC<TBlock>; defaults: Record<string, any> } => {
  return get(SERVER_BLOCKS, type, false);
};

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

export function BlocksRendererLive({ blocks, snapshot }: { blocks: TBlock[]; snapshot: any }) {
  const {
    pageData: { blocks: allBlocks },
  }: any = snapshot;
  const getStyles = (block: TBlock) => getStyleAttrs(block);

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
                  <BlocksRendererLive snapshot={snapshot} blocks={[find(allBlocks, { _id: slotId }) as TBlock]} />
                )),
              );
            });
          }
          if (includes(["Box", "Row", "Column", "DataContext", "Slot", "Link", "List", "ListItem"], block._type)) {
            attrs.children = (
              <BlocksRendererLive snapshot={snapshot} blocks={filter(allBlocks, { _parent: block._id })} />
            );
          }
          let blockDefinition = getBlockComponent(block._type);
          if (blockDefinition !== false) {
            let syncedBlock: TBlock = block;
            const Component: React.FC<any> = (blockDefinition as { component: React.FC<TBlock> }).component;
            syncedBlock = { ...(blockDefinition as any).defaults, ...block };
            return React.createElement(
              Component,
              omit(
                {
                  blockProps: {},
                  ...syncedBlock,
                  index,
                  ...getStyles(syncedBlock),
                  ...attrs,
                },
                ["_parent", "_name"],
              ),
            );
          }

          return React.createElement(ClientWrapper, block);
        }),
      )}
    </>
  );
}