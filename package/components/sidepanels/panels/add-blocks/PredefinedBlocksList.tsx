import { useDrag } from "react-dnd";
import { useAtom } from "jotai";
import { filter, first } from "lodash";
import { useBuilderProp } from "../../../../hooks/useBuilderProp";
import { addBlockOffCanvasAtom } from "../../../../store/ui";
import { useAddBlock, useSelectedBlockIds } from "../../../../hooks";
import { useUILibraryBlocks } from "../../../../hooks/useUiLibraries";

const PredefinedBlock = ({ block }: { block: any }) => {
  const { image } = block;
  const { addPredefinedBlock } = useAddBlock();
  const [ids] = useSelectedBlockIds();
  const getExternalBlock = useBuilderProp(
    "getExternalPredefinedBlock",
    async (predefinedBlock: any) => predefinedBlock
  );
  const [{ dragging }, drag, dragPreview] = useDrag(() => ({
    type: "PREDEFINED_BLOCK",
    item: block,
    collect: (monitor) => ({
      dragging: monitor.isDragging(),
    }),
  }));
  const [, setOpen] = useAtom(addBlockOffCanvasAtom);

  const addBlockToPage = async () => {
    const externalBlock = await getExternalBlock(block);
    addPredefinedBlock(externalBlock.blocks, first(ids));
    setOpen(false);
  };

  return (
    <button
      onClick={addBlockToPage}
      type="button"
      onDragStart={() => {
        setTimeout(() => setOpen(false), 100);
      }}
      ref={drag}
      className="border border-border cursor-pointer text-center rounded-lg hover:bg-slate-800/50">
      <img alt="Group" src={image} className="w-full mx-auto rounded-md" />
      {dragging ? <div className="w-32 h-10 mx-auto" ref={dragPreview} /> : null}
    </button>
  );
};

export const PredefinedBlocksList = ({ category }: { category: string }) => {
  const { data: predefinedBlocks } = useUILibraryBlocks();
  const blocks = filter(predefinedBlocks, { group: category });
  return (
    <div className="grid gap-y-2">
      {blocks.map((block) => (
        <PredefinedBlock key={block.c_id} block={block} />
      ))}
    </div>
  );
};
