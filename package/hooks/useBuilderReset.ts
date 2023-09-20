import { useCanvasHistory } from "./useCanvasHistory";
import { useHighlightBlockId } from "./useHighlightBlockId";
import { useSelectedBlockIds } from "./useSelectedBlockIds";
import { useSelectedStylingBlocks } from "./useSelectedStylingBlocks";

export const useBuilderReset = () => {
  const { clear } = useCanvasHistory();
  const [, setSelectedIds] = useSelectedBlockIds();
  const [, setHighlighted] = useHighlightBlockId();
  const [, setStylingHighlighted] = useSelectedStylingBlocks();
  return () => {
    setSelectedIds([]);
    setStylingHighlighted([]);
    setHighlighted("");
    clear();
  };
};
