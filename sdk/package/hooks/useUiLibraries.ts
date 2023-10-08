import { useBuilderProp } from "@/sdk/package/hooks/useBuilderProp";
import { useEffect, useState } from "react";

export const useUILibraryBlocks = () => {
  const [blocks, setBlocks] = useState([]);
  const getBlocks = useBuilderProp("getUILibraryBlocks", () => []);
  useEffect(() => {
    (async () => {
      setBlocks(await getBlocks());
    })();
  }, []);
  return blocks;
};
