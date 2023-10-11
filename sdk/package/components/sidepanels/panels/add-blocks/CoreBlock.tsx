import { useDrag } from "react-dnd";
import { useAtom } from "jotai";
import { first, has } from "lodash";
import { createElement } from "react";
import { BoxIcon } from "@radix-ui/react-icons";
import { addBlockOffCanvasAtom } from "../../../../store/ui";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../../radix/components/ui/tooltip";
import { useAddBlock, useSelectedBlockIds } from "../../../../hooks";
import { syncBlocksWithDefaults } from "../../../../blocks/builder-blocks";

export const CoreBlock = ({ block }: { block: any }) => {
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
      addPredefinedBlock(syncBlocksWithDefaults(block.blocks), first(ids));
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
          className="cursor-pointer space-y-2 rounded-lg border border-border p-3 text-center hover:bg-slate-300/50">
          {createElement(icon || BoxIcon, { className: "w-4 h-4 mx-auto" })}
          <p className="truncate text-xs">{label || type}</p>
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label || type}</p>
      </TooltipContent>
    </Tooltip>
  );
};
