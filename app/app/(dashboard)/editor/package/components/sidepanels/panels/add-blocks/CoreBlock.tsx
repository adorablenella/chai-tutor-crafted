import { useDrag } from "react-dnd";
import { useAtom } from "jotai";
import { first, has } from "lodash";
import { createElement } from "react";
import { BoxIcon } from "@radix-ui/react-icons";
import { addBlockOffCanvasAtom } from "../../../../store/ui";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../../radix/components/ui/tooltip";
import { useAddBlock, useSelectedBlockIds } from "../../../../hooks";
import { TBlock } from "../../../../types/TBlock";

export const CoreBlock = ({ block }: { block: TBlock }) => {
  const { type, icon, label } = block;
  const { addCoreBlock, addPredefinedBlock } = useAddBlock();
  const [ids] = useSelectedBlockIds();
  const [, drag] = useDrag(() => ({
    type: "CORE_BLOCK",
    item: block,
  }));
  const [, setOpen] = useAtom(addBlockOffCanvasAtom);

  const addBlockToPage = () => {
    if (has(block, "pre_block_id")) {
      addPredefinedBlock(block.blocks, first(ids));
    } else {
      addCoreBlock(block, first(ids));
    }
    setOpen(false);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={addBlockToPage}
          type="button"
          onDragStart={() => {
            setTimeout(() => setOpen(false), 100);
          }}
          ref={drag}
          className="border border-border cursor-pointer p-3 text-center space-y-2 rounded-lg hover:bg-slate-300/50">
          {createElement(icon || BoxIcon, { className: "w-4 h-4 mx-auto" })}
          <p className="text-xs truncate">{label || type}</p>
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{type}</p>
      </TooltipContent>
    </Tooltip>
  );
};
