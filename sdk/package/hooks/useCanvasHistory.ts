import { ActionCreators } from "redux-undo";
import { useCallback, useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { useDispatch } from "./useTreeData";
import { pageBlocksAtom } from "../store/blocks";
import { useCutBlockIds } from "./useCutBlockIds";
import { usePreviewMode } from "./usePreviewMode";
import { pageSyncStateAtom } from "./useSavePage";
import { useBuilderProp } from "./useBuilderProp";
import { historyStatesAtom } from "../store/ui";
import { useSelectedBlockIds } from "@/sdk/package/hooks/useSelectedBlockIds";
import { useSelectedStylingBlocks } from "@/sdk/package/hooks/useSelectedStylingBlocks";

type CanvasHistory = {
  redoCount: number;
  undoCount: number;
  clear: Function;
  createSnapshot: Function;
  redo: Function;
  undo: Function;
};
/**
 *
 */
export const useCanvasHistory = (): CanvasHistory => {
  const blocks: any = useAtomValue(pageBlocksAtom);
  const [{ undoCount, redoCount }, setCounts] = useAtom(historyStatesAtom);
  const dispatch = useDispatch();
  const [preview] = usePreviewMode();
  const [, setCutIds] = useCutBlockIds();
  const [, setIds] = useSelectedBlockIds();
  const [, setStyleBlocks] = useSelectedStylingBlocks();
  const [, setSyncState] = useAtom(pageSyncStateAtom);
  const onSyncStatusChange = useBuilderProp("onSyncStatusChange", () => {});

  const createSnapshot = useCallback(() => {
    // creates a snapshot of the current state
    dispatch({ type: "create_snapshot" });
  }, [dispatch]);

  useEffect(() => {
    if (undoCount !== blocks?.past.length || redoCount !== blocks?.future.length) {
      setSyncState("UNSAVED");
      onSyncStatusChange("UNSAVED");
    } else if (undoCount === blocks?.past.length && redoCount === blocks?.future.length) {
      setSyncState("SAVED");
      onSyncStatusChange("SAVED");
    }
  }, [blocks?.past.length, blocks?.future.length, undoCount, redoCount, onSyncStatusChange, setSyncState]);

  return {
    undoCount: blocks?.past.length,
    redoCount: blocks?.future.length,
    undo: useCallback(() => {
      if (preview) return;
      dispatch(ActionCreators.undo());
      setTimeout(() => {
        setStyleBlocks([]);
        setIds([]);
      }, 200);
    }, [dispatch, preview, setSyncState]),

    redo: useCallback(() => {
      if (preview) return;
      dispatch(ActionCreators.redo());
      setTimeout(() => {
        setStyleBlocks([]);
        setIds([]);
      }, 200);
    }, [preview, dispatch]),

    clear: () => {
      dispatch(ActionCreators.clearHistory());
    },
    createSnapshot,
  };
};
