import { ClipboardCopyIcon, ClipboardIcon, CopyIcon, GlobeIcon, ScissorsIcon, TrashIcon } from "@radix-ui/react-icons";
import { useCallback } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../../../../radix/components/ui/context-menu";
import {
  useBuilderProps,
  useCopyBlockIds,
  useCutBlockIds,
  useDuplicateBlocks,
  usePasteBlocks,
  useRemoveBlocks,
  useSelectedBlockIds,
} from "../../../../hooks";

const CutBlocks = () => {
  const [selectedIds] = useSelectedBlockIds();
  const [, setCutIds] = useCutBlockIds();

  return (
    <ContextMenuItem className="flex items-center gap-x-4 text-xs" onClick={() => setCutIds(selectedIds)}>
      <ScissorsIcon /> Cut
    </ContextMenuItem>
  );
};

const CopyBlocks = () => {
  const [selectedIds] = useSelectedBlockIds();
  const [, setCopyIds] = useCopyBlockIds();

  return (
    <ContextMenuItem className="flex items-center gap-x-4 text-xs" onClick={() => setCopyIds(selectedIds)}>
      <ClipboardIcon /> Copy
    </ContextMenuItem>
  );
};

const RemoveBlocks = () => {
  const [selectedIds] = useSelectedBlockIds();
  const removeBlocks = useRemoveBlocks();

  return (
    <ContextMenuItem className="flex items-center gap-x-4 text-xs" onClick={() => removeBlocks(selectedIds)}>
      <TrashIcon /> Remove
    </ContextMenuItem>
  );
};

const BlockContextMenuContent = ({ id = null }: { id: string | null }) => {
  const [selectedIds] = useSelectedBlockIds();
  // const multipleSelected = useMemo<boolean>(() => selectedIds.length > 1, [selectedIds]);
  const duplicateBlocks = useDuplicateBlocks();
  const { pasteBlocks, canPaste } = usePasteBlocks();
  const { globalBlocksSupport } = useBuilderProps();

  const duplicate = useCallback(() => {
    duplicateBlocks(selectedIds);
  }, [selectedIds, duplicateBlocks]);

  return (
    <ContextMenuContent className="text-xs">
      {globalBlocksSupport && (
        <ContextMenuItem className="flex items-center gap-x-4 border-b text-xs">
          <GlobeIcon /> Mark as global
        </ContextMenuItem>
      )}
      <ContextMenuItem className="flex items-center gap-x-4 text-xs" onClick={duplicate}>
        <CopyIcon /> Duplicate
      </ContextMenuItem>
      <CutBlocks />
      <CopyBlocks />
      <ContextMenuItem
        className="flex items-center gap-x-4 text-xs"
        onClick={() => pasteBlocks(id)}
        disabled={!canPaste}>
        <ClipboardCopyIcon /> Paste
      </ContextMenuItem>
      <RemoveBlocks />
    </ContextMenuContent>
  );
};

export const BlockContextMenu = ({ children, id = null }: any) => (
  <ContextMenu>
    <ContextMenuTrigger>{children}</ContextMenuTrigger>
    <BlockContextMenuContent id={id} />
  </ContextMenu>
);
