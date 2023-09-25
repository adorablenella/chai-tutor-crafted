import { useCallback } from "react";
import { useAtomValue } from "jotai";
import { map } from "lodash";
import { presentBlocksAtom } from "../store/blocks";
import { useDispatch } from "./useTreeData";
import { generateUUID } from "../functions/functions";
import { useGetPageData } from "./useGetPageData";
import { useBuilderProps } from "./useBuilderProps";
import { useBuildingBlocks } from "./useBuildingBlocks";

export const useMarkAsGlobalBlock = (): Function => {
  const presentBlocks = useAtomValue(presentBlocksAtom);
  const { onSavePage } = useBuilderProps();
  const dispatch = useDispatch();
  const getPageData = useGetPageData();
  const [, , addGlobalBlock] = useBuildingBlocks();

  return useCallback(
    async (blockId: string, name: string) => {
      const blockUid = generateUUID(16);
      const blocks = map(presentBlocks, (block: any) => {
        if (block._id === blockId) {
          // eslint-disable-next-line no-param-reassign
          block._globalBlockId = blockUid;
          // eslint-disable-next-line no-param-reassign
          block._name = name;
        }
        return block;
      });
      dispatch({ type: "set_page_blocks", payload: blocks });
      const newGlobal: any = {
        block_id: blockUid,
        name,
        group: "global",
        category: "global",
        blocks,
      };
      addGlobalBlock(newGlobal);
      await onSavePage(getPageData());
    },
    [presentBlocks, dispatch, getPageData, onSavePage, addGlobalBlock],
  );
};
