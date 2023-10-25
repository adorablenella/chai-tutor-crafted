import { useBuilderProp } from "@/sdk/package/hooks/useBuilderProp";
import { cache, useEffect, useState } from "react";
import { atom, useAtom } from "jotai";

const libraryBlocksAtom = atom([]);

export const useUILibraryBlocks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [blocks, setBlocks] = useAtom(libraryBlocksAtom);
  const getBlocks = cache(useBuilderProp("getUILibraryBlocks", () => []));
  useEffect(() => {
    (async () => {
      if (blocks.length > 0) return;
      setIsLoading(true);
      setBlocks(await getBlocks());
      setIsLoading(false);
    })();
  }, []);
  return { data: blocks, isLoading };
};
