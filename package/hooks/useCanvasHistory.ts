import { ActionCreators } from "redux-undo";
import { useCallback, useEffect } from "react";
import { useAtomValue } from "jotai";
import { useDispatch } from "./useTreeData";
import { pageBlocksAtom } from "../store/blocks";
import { useCutBlockIds } from "./useCutBlockIds";
import { usePreviewMode } from "./usePreviewMode";
import { useSavePage } from "./useSavePage";
import { useBuilderProp } from "./useBuilderProp";

type CanvasHistory = {
  canRedo: number;
  canUndo: number;
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
  const dispatch = useDispatch();
  const [preview] = usePreviewMode();
  const [, setCutIds] = useCutBlockIds();
  const { setSyncState } = useSavePage();
  const onSyncStatusChange = useBuilderProp("onSyncStatusChange", () => {});

  const createSnapshot = useCallback(() => {
    dispatch({ type: "create_snapshot" });
  }, [dispatch]);

  useEffect(() => {
    if (blocks?.past.length || blocks?.future.length) {
      setSyncState("UNSAVED");
      onSyncStatusChange("UNSAVED");
    }
  }, [blocks?.past.length, blocks?.future.length, setSyncState]);

  return {
    canUndo: blocks?.past.length,
    canRedo: blocks?.future.length,
    undo: useCallback(() => {
      if (preview) return;
      dispatch(ActionCreators.undo());
      setCutIds([]);
    }, [setCutIds, dispatch, preview, setSyncState]),

    redo: useCallback(() => {
      if (preview) return;
      dispatch(ActionCreators.redo());
    }, [preview, dispatch]),

    clear: () => dispatch(ActionCreators.clearHistory()),
    createSnapshot,
  };
};
