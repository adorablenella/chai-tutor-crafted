import { find, includes, isEmpty, isUndefined, map, pick } from "lodash";
import * as React from "react";
import { StackIcon } from "@radix-ui/react-icons";
import { useDrop } from "react-dnd";
import { NodeModel, Tree } from "@minoru/react-dnd-treeview";
import { useTranslation } from "react-i18next";
import {
  useAddBlock,
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
import { generateUUID } from "../../../../functions/functions";
import { canDropBlock } from "../../../../functions/Layers";
import { useExpandedIds, useExpandTree } from "../../../../hooks/useExpandTree";
import { TBlock } from "../../../../types/TBlock";
import { insertBlockAtIndex } from "../../../../helpers/general";
import { useBuilderProp } from "../../../../hooks/useBuilderProp";
import { BlockContextMenu } from "./BlockContextMenu";
import { ScrollArea } from "../../../../radix-ui";
import { useSelectedStylingBlocks } from "../../../../hooks/useSelectedStylingBlocks";
import { useHotkeys } from "react-hotkeys-hook";

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
  const { addCoreBlock, addPredefinedBlock } = useAddBlock();
  const getExternalBlock = useBuilderProp(
    "getExternalPredefinedBlock",
    async (predefinedBlock: any) => predefinedBlock,
  );
  const handleDrop = async (newTree: NodeModel[], options: any) => {
    const { monitor, dropTargetId, dragSource, relativeIndex } = options;
    let blocks: TBlock[] = map(newTree, (block) => {
      const { data } = block;
      return { ...(data as Object), _parent: block.parent === 0 ? null : block.parent } as TBlock;
    });

    if (!dragSource) {
      const droppedBlock = monitor.getItem();
      if (droppedBlock.c_id) {
        const externalBlock = await getExternalBlock(droppedBlock);
        addPredefinedBlock(externalBlock.blocks, null);
        return;
      }
      const newBlock: any = {
        ...pick(droppedBlock, ["type"]),
        ...droppedBlock.props,
        _parent: dropTargetId === 0 ? null : dropTargetId,
        _id: generateUUID(),
      };
      blocks = insertBlockAtIndex(blocks, newBlock._parent, relativeIndex, newBlock);
      setTimeout(() => setIds([newBlock._id]), 200);
    }
    setAllBlocks(blocks);
    createSnapshot();
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
    accept: ["CORE_BLOCK", "PREDEFINED_BLOCK"],
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
    drop: async (item: any) => {
      if (item.c_id) {
        const externalBlock = await getExternalBlock(item);
        addPredefinedBlock(externalBlock.blocks, null);
      } else addCoreBlock(item, null);
    },
  }));

  return (
    <div onClick={() => clearSelection()} className="-mx-1 flex h-full select-none flex-col space-y-1">
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
          extraAcceptTypes={["CORE_BLOCK", "PREDEFINED_BLOCK"]}
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
            root: "h-full",
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
  );
};

export default Layers;
