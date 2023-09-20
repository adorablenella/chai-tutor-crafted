import { ResetIcon } from "@radix-ui/react-icons";
import { Button } from "../../../radix-ui";
import { useCanvasHistory } from "../../../hooks";

export const UndoRedo = () => {
  const { canUndo, canRedo, undo, redo } = useCanvasHistory();
  return (
    <div className="flex items-center">
      <Button disabled={!canUndo} size="sm" onClick={undo as any} className="rounded-full" variant="ghost">
        <ResetIcon />
      </Button>
      <Button disabled={!canRedo} onClick={redo as any} size="sm" className="rounded-full" variant="ghost">
        <ResetIcon className="transform rotate-180 scale-y-[-1]" />
      </Button>
    </div>
  );
};
