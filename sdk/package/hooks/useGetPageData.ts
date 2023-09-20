import { useCallback } from "react";
import { map, omit } from "lodash";
import { useAtomValue } from "jotai";
import { useBrandingOptions } from "./useBrandingOptions";
import { useCurrentPage } from "./useCurrentPage";
import { presentBlocksAtom } from "../store/blocks";
import { BlockNode } from "../functions/Layers";
import { splitPageBlocks } from "../converters/split-blocks";

export const useGetPageData = () => {
  const [projectOptions] = useBrandingOptions();
  const { currentPage } = useCurrentPage();
  const presentBlocks: BlockNode[] = useAtomValue(presentBlocksAtom);

  return useCallback(() => {
    const blocks = map(presentBlocks, (block) =>
      omit(block, ["expanded", "order", "title", "siblings", "tempClasses"])
    );
    const [pageFilteredBlocks = [], globalBlocks = []] = splitPageBlocks(blocks);
    return {
      currentPage,
      blocks: pageFilteredBlocks,
      globalBlocks,
    };
  }, [projectOptions, currentPage, presentBlocks]);
};
