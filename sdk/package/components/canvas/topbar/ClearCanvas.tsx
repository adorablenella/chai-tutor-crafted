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
import { useCanvasHistory, useTreeData } from "../../../hooks";

export const ClearCanvas = () => {
  const [, setTreeData] = useTreeData();
  const { createSnapshot } = useCanvasHistory();
  const clearCanvas = useCallback(() => {
    setTreeData([]);
    createSnapshot();
  }, [setTreeData, createSnapshot]);

  return (
    <div className="flex items-center">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="ghost">
            <EraserIcon /> &nbsp; Clear
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
