import { find, includes, isEmpty, isUndefined, map } from "lodash";
import * as React from "react";
import { StackIcon } from "@radix-ui/react-icons";
import { useDragLayer, useDrop } from "react-dnd";
import { NodeModel, Tree } from "@minoru/react-dnd-treeview";
import { useTranslation } from "react-i18next";
import {
  useAllBlocks,
  useCanvasHistory,
  useCopyBlockIds,
  useCutBlockIds,
  useDuplicateBlocks,
  usePasteBlocks,
  useRemoveBlocks,
  useSelectedBlockIds,
} from "../../../../hooks";
import { CustomNode } from "./CustomNode";
import { CustomDragPreview } from "./CustomDragPreview";
import { Placeholder } from "./Placeholder";
import { useSetAllBlocks } from "../../../../hooks/useTreeData";
import { canDropBlock } from "../../../../functions/Layers";
import { useExpandedIds, useExpandTree } from "../../../../hooks/useExpandTree";
import { TBlock } from "../../../../types/TBlock";
import { BlockContextMenu } from "./BlockContextMenu";
import { ScrollArea } from "../../../../radix-ui";
import { useSelectedStylingBlocks } from "../../../../hooks/useSelectedStylingBlocks";
import { useHotkeys } from "react-hotkeys-hook";
import { cn } from "@/lib/utils";
import { useAddBlockByDrop } from "@/sdk/package/hooks/useAddBlockByDrop";

const useKeyEventWatcher = () => {
  const [ids, setIds, toggleIds] = useSelectedBlockIds();
  const [, setStyleBlocks] = useSelectedStylingBlocks();
  const [, setCopyIds] = useCopyBlockIds();
  const removeBlocks = useRemoveBlocks();
  const duplicateBlocks = useDuplicateBlocks();
  const [, setCutIds] = useCutBlockIds();
  const { pasteBlocks, canPaste } = usePasteBlocks();
  const { undo, redo } = useCanvasHistory();
  useHotkeys("esc", () => setIds([]), {}, [setIds]);
  useHotkeys("ctrl+c,command+c", () => setCopyIds(ids), {}, [ids, setCopyIds]);
  useHotkeys("ctrl+d,command+d", () => duplicateBlocks(ids), {}, [ids, duplicateBlocks]);
  useHotkeys("ctrl+x,command+x", () => setCutIds(ids), {}, [ids, setCutIds]);
  useHotkeys("ctrl+v,command+v", () => (ids.length === 1 ? pasteBlocks(ids[0]) : null), {}, [ids, pasteBlocks]);
  useHotkeys("ctrl+z,command+z", () => undo(), {}, [undo]);
  useHotkeys("ctrl+y,command+y", () => redo(), {}, [redo]);

  useHotkeys(
    "del, backspace",
    (event: any) => {
      event.preventDefault();
      removeBlocks(ids);
    },
    {},
    [ids, removeBlocks],
  );
};

function convertToTBlocks(newTree: NodeModel[]) {
  return map(newTree, (block) => {
    const { data } = block;
    return { ...(data as Object), _parent: block.parent === 0 ? null : block.parent } as TBlock;
  });
}

const Layers = (): React.JSX.Element => {
  const allBlocks = useAllBlocks();
  const [setAllBlocks] = useSetAllBlocks();
  const [ids, setIds, toggleIds] = useSelectedBlockIds();
  const [, setStyleBlocks] = useSelectedStylingBlocks();
  const { t } = useTranslation();
  const { createSnapshot } = useCanvasHistory();
  useExpandTree();
  useKeyEventWatcher();
  const expandedIds = useExpandedIds();
  const addBlockOnDrop = useAddBlockByDrop();
  const handleDrop = async (newTree: NodeModel[], options: any) => {
    const { dragSource, destinationIndex, relativeIndex, dropTargetId, monitor } = options;
    let blocks: TBlock[] = convertToTBlocks(newTree);
    setAllBlocks(blocks);
    if (dragSource) {
      createSnapshot();
    } else {
      addBlockOnDrop({
        block: monitor.getItem(),
        dropTargetId,
        destinationIndex,
        relativeIndex,
      });
    }
  };

  const treeBlocks: any = map(allBlocks, (block: TBlock) => ({
    id: block._id,
    text: block._type,
    parent: block._parent || 0,
    droppable: !isUndefined(find(allBlocks, { _parent: block._id })),
    data: block,
  }));

  const clearSelection = () => {
    setIds([]);
    setStyleBlocks([]);
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["CHAI_BLOCK"],
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  }));

  const { isDragging } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
  }));

  return (
    <>
      <div
        onClick={() => clearSelection()}
        className={cn(
          "-mx-1 -mt-1 flex h-full select-none flex-col space-y-1",
          isDragging ? "bg-green-50/80" : "bg-background",
        )}>
        <div className="mx-1 rounded-md bg-background/30 p-1">
          <h1 className="px-1 font-semibold">Tree view</h1>
        </div>
        {isEmpty(allBlocks) ? (
          <div
            ref={drop}
            className={`mx-1 mt-4 h-full p-6 text-center text-sm text-gray-400 ${isOver ? "bg-blue-200" : ""}`}>
            <StackIcon className="mx-auto h-10 w-10" />
            <p className="mt-2">{t("tree_view_no_blocks")}</p>
          </div>
        ) : null}
        <ScrollArea id="layers-view" className="no-scrollbar h-full overflow-y-auto p-1">
          <Tree
            initialOpen={expandedIds}
            extraAcceptTypes={["CHAI_BLOCK"]}
            tree={treeBlocks}
            rootId={0}
            render={(node, { depth, isOpen, onToggle }) => (
              <BlockContextMenu id={node.id}>
                <CustomNode
                  onSelect={(id: string) => {
                    setStyleBlocks([]);
                    setIds([id]);
                  }}
                  isSelected={includes(ids, node.id)}
                  node={node}
                  depth={depth}
                  isOpen={isOpen}
                  onToggle={onToggle}
                  toggleIds={toggleIds}
                />
              </BlockContextMenu>
            )}
            dragPreviewRender={(monitorProps) => <CustomDragPreview monitorProps={monitorProps} />}
            onDrop={handleDrop}
            classes={{
              root: "h-full pt-2",
              draggingSource: "opacity-30",
              placeholder: "relative",
            }}
            sort={false}
            insertDroppableFirst={false}
            canDrop={canDropBlock}
            dropTargetOffset={2}
            placeholderRender={(node, { depth }) => <Placeholder node={node} depth={depth} />}
          />
        </ScrollArea>
      </div>
    </>
  );
};

export default Layers;
