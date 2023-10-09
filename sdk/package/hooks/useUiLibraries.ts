import { useBuilderProp } from "@/sdk/package/hooks/useBuilderProp";
import { useEffect, useState } from "react";

export const useUILibraryBlocks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const getBlocks = useBuilderProp("getUILibraryBlocks", () => []);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setBlocks(await getBlocks());
      setIsLoading(false);
    })();
  }, []);
  return { data: blocks, isLoading };
};
