import { filter, first, groupBy, has, isArray, isEmpty, map, mergeWith, values } from "lodash";
import React, { Suspense, useCallback, useMemo, useState } from "react";
import { useUILibraryBlocks } from "../../../../hooks/useUiLibraries";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../radix-ui";
import { ChevronRightIcon } from "@radix-ui/react-icons";
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
    const uiBlocks = await getExternalPredefinedBlock(block);
    if (!isEmpty(uiBlocks)) addPredefinedBlock(syncBlocksWithDefaults(uiBlocks), first(ids));
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
        className="w-full rounded-md border border-border"
        alt={block.name}
        width={100}
        height={100}
      />
    </div>
  );
};

const Panel = ({ group, blocks }: { blocks: any[]; group: string }) => {
  const [open, setOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<any>(null);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        onClick={() => setOpen(!open)}
        onMouseOut={() => {
          clearTimeout(timeoutId);
          setTimeoutId(null);
        }}
        onMouseEnter={() => {
          const timeout = setTimeout(() => {
            setOpen(!open);
          }, 700);
          setTimeoutId(timeout);
        }}>
        <div
          className={`flex cursor-pointer items-center justify-between rounded p-2 text-sm capitalize ${
            open ? "bg-primary/10" : "duration-200 hover:bg-primary/5"
          }`}>
          {group}
          {open && <ChevronRightIcon />}
        </div>
      </PopoverTrigger>
      <PopoverRoot.Portal className="bg-white">
        <PopoverContent
          side="right"
          align="start"
          alignOffset={0}
          sideOffset={5}
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
              blocks.map((block) => <BlockCard block={block} closePopover={() => setOpen(false)} />),
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
          <li className="h-8 w-full animate-pulse bg-gray-200"></li>
          <li className="mt-2 h-8 w-full animate-pulse bg-gray-200"></li>
          <li className="mt-2 h-8 w-full animate-pulse bg-gray-200"></li>
          <li className="mt-2 h-8 w-full animate-pulse bg-gray-200"></li>
          <li className="mt-2 h-8 w-full animate-pulse bg-gray-200"></li>
          <li className="mt-2 h-8 w-full animate-pulse bg-gray-200"></li>
        </>
      ) : (
        React.Children.toArray(
          map(mergedGroups, (blocks, group) => (
            <li>
              <Panel blocks={blocks} group={group} />
            </li>
          )),
        )
      )}
    </ul>
  );
};
