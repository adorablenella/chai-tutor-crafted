import { useCallback } from "react";
import { useAddBlock } from "@/sdk/package/hooks/useAddBlock";
import { has } from "lodash";
import { useBuilderProp } from "@/sdk/package/hooks/useBuilderProp";
import { useRemoveBlocks } from "@/sdk/package/hooks/useRemoveBlocks";

type DroppedBlock = {
  block: any;
  destinationIndex: number;
  relativeIndex: number;
  dropTargetId: string | number;
};

export const useAddBlockByDrop = () => {
  const { addCoreBlock } = useAddBlock();
  const removeBlock = useRemoveBlocks();
  const getExternalPredefinedBlock = useBuilderProp("getExternalPredefinedBlock");
  return useCallback(
    async (options: DroppedBlock) => {
      const { block: droppedBlock, dropTargetId, relativeIndex } = options;
      if (has(droppedBlock, "format")) {
        const uiBlocks = await getExternalPredefinedBlock(droppedBlock);
        return addCoreBlock({ blocks: uiBlocks }, dropTargetId === 0 ? null : dropTargetId, relativeIndex);
      }
      return addCoreBlock(droppedBlock, dropTargetId === 0 ? null : dropTargetId, relativeIndex);
    },
    [addCoreBlock],
  );
};
