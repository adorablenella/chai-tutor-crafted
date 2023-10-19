import { useCallback } from "react";
import { EraserIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "../../../radix-ui";
import { useCanvasHistory, useSelectedBlockIds } from "../../../hooks";
import { useSetAllBlocks } from "@/sdk/package/hooks/useTreeData";
import { useSelectedStylingBlocks } from "@/sdk/package/hooks/useSelectedStylingBlocks";

export const ClearCanvas = () => {
  const [setAllBlocks] = useSetAllBlocks();
  const { createSnapshot } = useCanvasHistory();
  const [, setIds] = useSelectedBlockIds();
  const [, setStyleIds] = useSelectedStylingBlocks();
  const clearCanvas = useCallback(() => {
    setAllBlocks([]);
    setIds([]);
    setStyleIds([]);
    createSnapshot();
  }, [setAllBlocks, createSnapshot]);

  return (
    <div className="flex items-center">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="ghost" className="flex items-center gap-x-1">
            <EraserIcon /> Clear
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Clear whole canvas?</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to clear the whole canvas?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={clearCanvas}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
