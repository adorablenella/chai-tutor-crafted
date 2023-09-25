import { ResetIcon } from "@radix-ui/react-icons";
import { Button } from "../../../radix-ui";
import { useCanvasHistory } from "../../../hooks";

export const UndoRedo = () => {
  const { undoCount, redoCount, undo, redo } = useCanvasHistory();
  return (
    <div className="flex items-center">
      <Button disabled={!undoCount} size="sm" onClick={undo as any} className="rounded-full" variant="ghost">
        <ResetIcon />
      </Button>
      <Button disabled={!redoCount} onClick={redo as any} size="sm" className="rounded-full" variant="ghost">
        <ResetIcon className="rotate-180 scale-y-[-1] transform" />
      </Button>
    </div>
  );
};
