import { filter, first, map } from "lodash";
import React, { Suspense, useCallback, useState } from "react";
import { useUILibraryBlocks } from "../../../../hooks/useUiLibraries";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../radix-ui";
import { ChevronRightIcon, GearIcon } from "@radix-ui/react-icons";
import * as PopoverRoot from "@radix-ui/react-popover";
import { useBuilderProp } from "../../../../hooks/useBuilderProp";
import { useAddBlock, useSelectedBlockIds } from "../../../../hooks";
import { syncBlocksWithDefaults } from "../../../../blocks/builder-blocks";

const BlockCard = ({ block }: { block: any }) => {
  const getExternalPredefinedBlock = useBuilderProp("getExternalPredefinedBlock");
  const { addPredefinedBlock } = useAddBlock();
  const [ids] = useSelectedBlockIds();
  const addBlock = useCallback(async () => {
    const uiBlock = await getExternalPredefinedBlock(block);
    addPredefinedBlock(syncBlocksWithDefaults(uiBlock.blocks), first(ids));
  }, []);

  return (
    <div onClick={addBlock}>
      <img src={block.preview} className="w-full rounded-md" alt={block.name} />
    </div>
  );
};

const Panel = ({ group, blocks }: { blocks: any[]; group: string }) => {
  const [open, setOpen] = useState<"CLOSE" | "OPEN" | "ALERT" | "PENDING">("CLOSE");
  return (
    <Popover
      open={open === "OPEN" || open === "ALERT" || open === "PENDING"}
      onOpenChange={(_open) => {
        setOpen(open === "PENDING" ? "ALERT" : _open ? "OPEN" : "CLOSE");
      }}>
      <PopoverTrigger asChild onClick={() => setOpen("OPEN")}>
        <div className="flex items-center justify-between text-sm">
          {group}
          {open === "OPEN" || open === "ALERT" || open === "PENDING" ? (
            <ChevronRightIcon />
          ) : (
            <div className="hidden hover:text-blue-600 group-hover:flex">
              <GearIcon />
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverRoot.Portal>
        <PopoverContent side="right" align="start" alignOffset={-35} className="h-screen w-96">
          <Suspense
            fallback={
              <div className="flex w-full animate-pulse flex-col gap-y-3">
                <div className="bg-background-300 h-6 w-1/2" />
                <div className="bg-background-300 h-20 w-full" />
                <div className="bg-background-300 h-20 w-full" />
              </div>
            }>
            {blocks.map((block) => (
              <BlockCard block={block} />
            ))}
          </Suspense>
        </PopoverContent>
      </PopoverRoot.Portal>
    </Popover>
  );
};

export const PredefinedBlocks = () => {
  const predefinedBlocks = useUILibraryBlocks();
  const groupsList: string[] = map(predefinedBlocks, "group");
  return (
    <ul className="px-4">
      {groupsList.map((group) => (
        <li>
          <Panel blocks={filter(predefinedBlocks, { group })} group={group} />
        </li>
      ))}
    </ul>
  );
};
