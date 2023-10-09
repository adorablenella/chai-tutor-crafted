import { filter, first, groupBy, has, isArray, isEmpty, map, mergeWith, values } from "lodash";
import React, { Suspense, useCallback, useMemo, useState } from "react";
import { useUILibraryBlocks } from "../../../../hooks/useUiLibraries";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../radix-ui";
import { ChevronRightIcon, GearIcon } from "@radix-ui/react-icons";
import * as PopoverRoot from "@radix-ui/react-popover";
import { useBuilderProp } from "../../../../hooks/useBuilderProp";
import { useAddBlock, useSelectedBlockIds } from "../../../../hooks";
import { syncBlocksWithDefaults } from "../../../../blocks/builder-blocks";
import Image from "next/image";
import { Loader } from "lucide-react";
import { useCoreBlocks } from "@/sdk/package/hooks/useCoreBlocks";

const BlockCard = ({ block, closePopover }: { block: any; closePopover: () => void }) => {
  const [isAdding, setIsAdding] = useState(false);
  const getExternalPredefinedBlock = useBuilderProp("getExternalPredefinedBlock");
  const { addCoreBlock, addPredefinedBlock } = useAddBlock();
  const [ids] = useSelectedBlockIds();

  const addBlock = useCallback(async () => {
    if (has(block, "component")) {
      addCoreBlock(block, first(ids));
      closePopover();
      return;
    }
    setIsAdding(true);
    const uiBlock = await getExternalPredefinedBlock(block);
    if (!isEmpty(uiBlock.blocks)) addPredefinedBlock(syncBlocksWithDefaults(uiBlock.blocks), first(ids));
    closePopover();
  }, []);

  return (
    <div
      onClick={isAdding ? () => {} : addBlock}
      className="relative cursor-pointer overflow-hidden rounded-md border border-transparent duration-200 hover:border-foreground/90 hover:shadow-2xl">
      {isAdding && (
        <div className="absolute flex h-full w-full items-center justify-center bg-black bg-opacity-70">
          <Loader className="animate-spin" size={15} color="white" />{" "}
          <span className="pl-2 text-sm text-white">Adding...</span>
        </div>
      )}
      <Image
        src={block.preview || "https://placehold.it/400/150"}
        className="w-full"
        alt={block.name}
        width={100}
        height={100}
      />
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
        <div className="flex items-center justify-between text-sm capitalize">
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
        <PopoverContent
          side="right"
          align="start"
          alignOffset={0}
          sideOffset={10}
          className="h-screen w-96 space-y-2 overflow-y-auto">
          <Suspense
            fallback={
              <div className="flex w-full animate-pulse flex-col gap-y-3">
                <div className="bg-background-300 h-6 w-1/2" />
                <div className="bg-background-300 h-20 w-full" />
                <div className="bg-background-300 h-20 w-full" />
              </div>
            }>
            {React.Children.toArray(
              blocks.map((block) => <BlockCard block={block} closePopover={() => setOpen("CLOSE")} />),
            )}
          </Suspense>
        </PopoverContent>
      </PopoverRoot.Portal>
    </Popover>
  );
};

export const PredefinedBlocks = () => {
  const { data: predefinedBlocks, isLoading } = useUILibraryBlocks();
  const coreBlocks = useCoreBlocks();
  const customBlocks = filter(values(coreBlocks), { category: "custom" });
  const customGroupsList: Record<string, any[]> = groupBy(customBlocks, "group");
  const groupsList: Record<string, any[]> = groupBy(predefinedBlocks, "group");

  const mergedGroups = useMemo(() => {
    return mergeWith(customGroupsList, groupsList, (a: any, b: any) => {
      // Concatenate arrays for the same key
      if (isArray(a) && isArray(b)) return [...a, ...b];
    });
  }, [customGroupsList, groupsList]);
  return (
    <ul className="">
      {isLoading ? (
        <>
          <li className="h-24 w-full animate-pulse"></li>
          <li className="h-24 w-full animate-pulse"></li>
          <li className="h-24 w-full animate-pulse"></li>
        </>
      ) : (
        React.Children.toArray(
          map(mergedGroups, (blocks, group) => (
            <li className="cursor-pointer rounded p-2 hover:bg-primary/5">
              <Panel blocks={blocks} group={group} />
            </li>
          )),
        )
      )}
    </ul>
  );
};
