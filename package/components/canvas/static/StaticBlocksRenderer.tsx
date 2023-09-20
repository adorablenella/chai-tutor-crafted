import React from "react";
import { filter, isEmpty } from "lodash";
import { Provider } from "react-wrap-balancer";
import { useAllBlocks } from "../../../hooks";
import { EmptyCanvas } from "../EmptyCanvas";
import { BlocksRendererStatic } from "./BlocksRenderer";

export const StaticBlocksRenderer = () => {
  const blocks = useAllBlocks();
  return (
    <Provider>
      {!blocks.length ? (
        <EmptyCanvas />
      ) : (
        <BlocksRendererStatic blocks={filter(blocks, (block) => isEmpty(block._parent))} />
      )}
    </Provider>
  );
};
