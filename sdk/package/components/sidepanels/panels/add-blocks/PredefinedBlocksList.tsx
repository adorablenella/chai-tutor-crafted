import { useDrag } from "react-dnd";
import { useAtom } from "jotai";
import { first } from "lodash";
import { useBuilderProp } from "../../../../hooks/useBuilderProp";
import { addBlockOffCanvasAtom } from "../../../../store/ui";
import { useAddBlock, useSelectedBlockIds } from "../../../../hooks";

const PredefinedBlock = ({ block }: { block: any }) => {
  const { image } = block;
  const { addPredefinedBlock } = useAddBlock();
  const [ids] = useSelectedBlockIds();
  const getExternalBlock = useBuilderProp(
    "getExternalPredefinedBlock",
    async (predefinedBlock: any) => predefinedBlock,
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
    const externalBlocks = await getExternalBlock(block);
    addPredefinedBlock(externalBlocks, first(ids));
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
      className="cursor-pointer rounded-lg border border-border text-center hover:bg-slate-800/50">
      <img alt="Group" src={image} className="mx-auto w-full rounded-md" />
      {dragging ? <div className="mx-auto h-10 w-32" ref={dragPreview} /> : null}
    </button>
  );
};
