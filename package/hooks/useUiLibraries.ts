import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { PredefinedBlock } from "../types";
import { useBuilderProp } from "./useBuilderProp";

export const uiLibrariesAtom: any = atom<{ name: string; uuid: string }[]>([]);
export const useUiLibraries = () => useAtom(uiLibrariesAtom);

const predefinedBlocksAtom = atom<PredefinedBlock[]>([]);
const fetchPredefinedBlocksAtom = atom<boolean>(false);
export const useUILibraryBlocks = () => {
  const [predefinedBlocks, setPredefinedBlocks] = useAtom(predefinedBlocksAtom);
  const [isFetching, setFetchPredefinedBlocks] = useAtom(fetchPredefinedBlocksAtom);
  const getUILibraryBlocks: Function = useBuilderProp("getUILibraryBlocks", async () => []);
  useEffect(() => {
    if (predefinedBlocks.length > 0 || isFetching) {
      return;
    }
    setFetchPredefinedBlocks(true);
    getUILibraryBlocks().then(
      (blocks: PredefinedBlock[]) => {
        setPredefinedBlocks(blocks);
        setFetchPredefinedBlocks(false);
      },
      () => {
        setFetchPredefinedBlocks(false);
      }
    );
  }, [isFetching, setFetchPredefinedBlocks, setPredefinedBlocks, predefinedBlocks.length, getUILibraryBlocks]);

  return { data: predefinedBlocks, isLoading: isFetching };
};
