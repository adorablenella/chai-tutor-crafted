import { useEffect } from "react";
import { useFrame } from "react-frame-component";
import { useAtom } from "jotai";
import { first } from "lodash";
import {
  useSelectedBlockIds,
  useCanvasHistory,
  useDuplicateBlocks,
  usePreviewMode,
  useRemoveBlocks,
  useCutBlockIds,
  useCopyBlockIds,
  usePasteBlocks,
  useSavePage,
} from "../../hooks";
import { editLayerNameAtom, inlineEditingActiveAtom } from "../../store/ui";

export const KeyboardHandler = ({ sendToParent }: any) => {
  const { window: iframeWin }: any = useFrame();
  const [ids, setSelected] = useSelectedBlockIds();
  const { undo, redo } = useCanvasHistory();
  const duplicateBlocks = useDuplicateBlocks();
  const [, cut] = useCutBlockIds();
  const [, copy] = useCopyBlockIds();
  const { pasteBlocks } = usePasteBlocks();
  const [, setPreview] = usePreviewMode();
  const removeBlocks = useRemoveBlocks();
  const { savePage } = useSavePage();
  const [editing] = useAtom(inlineEditingActiveAtom);
  const [, setEditName] = useAtom(editLayerNameAtom);
  const enterEditMode = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (ids.length === 1) {
        setEditName(first(ids));
      }
    }
  };

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    const handleKeyDown = (e: any) => {
      if (e.key === "Escape") {
        sendToParent("setSelected", []);
      }
      enterEditMode(e);
      if (!editing && (e.key === "Delete" || e.key === "Backspace")) {
        e.preventDefault();
        sendToParent("removeBlocks", ids);
      }
      if (e.ctrlKey || e.metaKey) {
        if (["z", "y", "d", "x", "c", "p", "s", "v"].includes(e.key)) {
          if (editing && ["x", "z", "v"].includes(e.key)) {
            return true;
          }
          e.preventDefault();
        }
        if (e.key === "s") {
          e.stopPropagation();
          e.preventDefault();
          savePage();
        }
        if (e.key === "z") undo();
        if (e.key === "y") redo();
        if (e.key === "d") duplicateBlocks(ids);
        if (e.key === "x") cut(ids);
        if (e.key === "c") copy(ids);
        if (e.key === "p") setPreview((preview: boolean) => !preview);
        if (e.key === "v" && ids.length > 0) pasteBlocks(ids[0]);
      }
    };
    // TODO: check for performance impact
    iframeWin.removeEventListener("keydown", handleKeyDown);
    iframeWin.addEventListener("keydown", handleKeyDown);
    return () => {
      iframeWin.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    ids,
    setSelected,
    undo,
    removeBlocks,
    setPreview,
    redo,
    duplicateBlocks,
    cut,
    copy,
    pasteBlocks,
    editing,
    savePage,
    iframeWin,
  ]);
  return null;
};
