import { useSelectedBlockIds } from "@/sdk/package/hooks/useSelectedBlockIds";
import { useCopyBlockIds } from "@/sdk/package/hooks/useCopyBlockIds";
import { useRemoveBlocks } from "@/sdk/package/hooks/useRemoveBlocks";
import { useDuplicateBlocks } from "@/sdk/package/hooks/useDuplicateBlocks";
import { useCutBlockIds } from "@/sdk/package/hooks/useCutBlockIds";
import { usePasteBlocks } from "@/sdk/package/hooks/usePasteBlocks";
import { useCanvasHistory } from "@/sdk/package/hooks/useCanvasHistory";
import { useHotkeys } from "react-hotkeys-hook";

export const useKeyEventWatcher = () => {
  const [ids, setIds, toggleIds] = useSelectedBlockIds();
  const [, setCopyIds] = useCopyBlockIds();
  const removeBlocks = useRemoveBlocks();
  const duplicateBlocks = useDuplicateBlocks();
  const [, setCutIds] = useCutBlockIds();
  const { pasteBlocks, canPaste } = usePasteBlocks();
  const { undo, redo } = useCanvasHistory();

  useHotkeys("esc", () => setIds([]), {}, [setIds]);
  useHotkeys("ctrl+c,command+c", () => setCopyIds(ids), {}, [ids, setCopyIds]);
  useHotkeys("ctrl+d,command+d", () => duplicateBlocks(ids), { preventDefault: true }, [ids, duplicateBlocks]);
  useHotkeys("ctrl+x,command+x", () => setCutIds(ids), {}, [ids, setCutIds]);
  useHotkeys("ctrl+v,command+v", () => (ids.length === 1 ? pasteBlocks(ids[0]) : null), {}, [ids, pasteBlocks]);
  useHotkeys("ctrl+z,command+z", () => undo(), {}, [undo]);
  useHotkeys("ctrl+y,command+y", () => redo(), {}, [redo]);

  useHotkeys(
    "del, backspace",
    (event: any) => {
      event.preventDefault();
      removeBlocks(ids);
    },
    {},
    [ids, removeBlocks],
  );
};
