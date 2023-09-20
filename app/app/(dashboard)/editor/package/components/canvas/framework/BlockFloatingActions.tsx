import { flip } from "@floating-ui/dom";
import { shift, useFloating } from "@floating-ui/react-dom";
import { get, isEmpty } from "lodash";
import { ArrowUpIcon, CopyIcon, DragHandleDots2Icon, TrashIcon } from "@radix-ui/react-icons";
import { useDrag } from "react-dnd";
import { canDeleteBlock, canDuplicateBlock } from "../../../functions/Layers";

const BlockActionLabel = ({ block, label }: any) => {
  const [, drag] = useDrag(() => ({
    type: "CANVAS_BLOCK",
    item: block,
  }));

  return (
    <div
      className="mr-10 px-1 flex cursor-grab items-center space-x-1"
      ref={drag}
      onDragStart={() => {
        console.log("drag start");
        /** This works when drag start */
      }}>
      <DragHandleDots2Icon />
      {label}
    </div>
  );
};

// FIXME: lazy load this component
export const BlockActions = ({
  selectedBlockElement,
  block,
  sendToParent,
}: {
  block: any;
  selectedBlockElement: HTMLElement | undefined;
  sendToParent: Function;
}) => {
  const { floatingStyles, refs } = useFloating({
    placement: "top-start",
    middleware: [shift(), flip()],
    elements: {
      reference: selectedBlockElement,
    },
  });

  const parentId: string | undefined | null = get(block, "_parent", null);

  const label: string = isEmpty(get(block, "_name", "")) ? get(block, "_type", "") : get(block, "_name", "");

  if (!selectedBlockElement || !block) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      ref={refs.setFloating}
      style={floatingStyles}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onKeyDown={(e) => e.stopPropagation()}
      className="z-50 flex h-6 items-center bg-blue-500  py-2 text-xs text-white">
      <BlockActionLabel label={label} block={block} />
      <div className="flex gap-2 px-1 ">
        {parentId && (
          <ArrowUpIcon className="hover:scale-105 " onClick={() => sendToParent("setSelected", { id: parentId })} />
        )}
        {canDuplicateBlock(get(block, "type", "")) ? (
          <CopyIcon
            className="hover:scale-105 "
            onClick={() => sendToParent("duplicateBlock", { id: block?._id, parentId })}
          />
        ) : null}
        {canDeleteBlock(get(block, "type", "")) ? (
          <TrashIcon className="hover:scale-105 " onClick={() => sendToParent("removeBlock", { id: block?._id })} />
        ) : null}
      </div>
    </div>
  );
};
