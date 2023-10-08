import { ClipboardCopyIcon, ClipboardIcon, CopyIcon, GlobeIcon, ScissorsIcon, TrashIcon } from "@radix-ui/react-icons";
import React, { lazy, Suspense, useCallback, useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../../../../radix/components/ui/context-menu";
import { Dialog, DialogContent } from "../../../../radix/components/ui/dialog";
import {
  useBuilderProps,
  useCopyBlockIds,
  useCutBlockIds,
  useDuplicateBlocks,
  usePasteBlocks,
  useRemoveBlocks,
  useSelectedBlockIds,
} from "../../../../hooks";
import { useSelectedBlock } from "@/sdk/package/hooks/useSelectedBlockIds";

const MarkAsGlobalBlock = lazy(() => import("./MarkAsGlobalBlock"));

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
  const selectedBlock = useSelectedBlock();

  return (
    <ContextMenuItem
      // @ts-ignore
      disabled={selectedBlock?._type === "Slot"}
      className="flex items-center gap-x-4 text-xs"
      onClick={() => removeBlocks(selectedIds)}>
      <TrashIcon /> Remove
    </ContextMenuItem>
  );
};

const BlockContextMenuContent = ({
  id = null,
  openMarkAsGlobalModal,
}: {
  id: string | null;
  openMarkAsGlobalModal: () => void;
}) => {
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
        <ContextMenuItem className="flex items-center gap-x-4 border-b text-xs" onClick={openMarkAsGlobalModal}>
          <div className="flex items-center gap-x-4">
            <GlobeIcon /> Mark as global
          </div>
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

export const BlockContextMenu = ({ children, id = null }: { children: React.ReactNode | null; id: any }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        {open && (
          <DialogContent>
            <Suspense fallback={<div className="h-96 w-full animate-pulse bg-gray-200" />}>
              <MarkAsGlobalBlock closeModal={() => setOpen(false)} id={id} />
            </Suspense>
          </DialogContent>
        )}
      </Dialog>
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <BlockContextMenuContent id={id} openMarkAsGlobalModal={() => setOpen(true)} />
      </ContextMenu>
    </>
  );
};
