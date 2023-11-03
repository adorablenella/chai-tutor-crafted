import { filter, first, get, groupBy, has, isArray, isEmpty, map, mergeWith, values } from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import { useUILibraryBlocks } from "../../../../hooks/useUiLibraries";
import { useBuilderProp } from "../../../../hooks/useBuilderProp";
import { useAddBlock, useSelectedBlockIds } from "../../../../hooks";
import { syncBlocksWithDefaults } from "../../../../blocks/builder-blocks";
import { Loader } from "lucide-react";
import { useCoreBlocks } from "@/sdk/package/hooks/useCoreBlocks";
import { DragPreviewImage, useDrag } from "react-dnd";
import { useAtom } from "jotai";
import { cn } from "@/lib/utils";
import { addBlocksModalAtom } from "@/sdk/package/store/blocks";

const BlockCard = ({ block, closePopover }: { block: any; closePopover: () => void }) => {
  const [isAdding, setIsAdding] = useState(false);
  const getExternalPredefinedBlock = useBuilderProp("getExternalPredefinedBlock");
  const { addCoreBlock, addPredefinedBlock } = useAddBlock();
  const [ids] = useSelectedBlockIds();

  const [, drag, dragPreview] = useDrag(
    () => ({
      type: "CHAI_BLOCK",
      item: block,
    }),
    [block],
  );

  const addBlock = useCallback(
    async (e: any) => {
      e.stopPropagation();
      if (has(block, "component")) {
        addCoreBlock(block, first(ids));
        closePopover();
        return;
      }
      setIsAdding(true);
      const uiBlocks = await getExternalPredefinedBlock(block);
      if (!isEmpty(uiBlocks)) addPredefinedBlock(syncBlocksWithDefaults(uiBlocks), first(ids));
      closePopover();
    },
    [block],
  );

  return (
    <>
      <DragPreviewImage
        connect={dragPreview}
        src={"https://placehold.co/100x30/000000/FFF?text=" + (block.name || block.label)?.replace(" ", "+")}
      />
      <div
        ref={drag}
        onClick={isAdding ? () => {} : addBlock}
        className="relative cursor-grab overflow-hidden rounded-md border border-transparent duration-200 hover:scale-x-105 hover:border-foreground/20 hover:shadow-2xl">
        {isAdding && (
          <div className="absolute flex h-full w-full items-center justify-center bg-black bg-opacity-70">
            <Loader className="animate-spin" size={15} color="white" />{" "}
            <span className="pl-2 text-sm text-white">Adding...</span>
          </div>
        )}
        {block.preview ? (
          <img src={block.preview} className="min-h-[50px] w-full rounded-md border border-gray-300" alt={block.name} />
        ) : (
          <div className="flex h-20 items-center justify-center rounded-md border border-border border-gray-300 bg-gray-200">
            <p className={"max-w-xs text-center text-sm text-gray-700"}>{block.name}</p>
          </div>
        )}
      </div>
    </>
  );
};

export const PredefinedBlocks = () => {
  const { data: predefinedBlocks, isLoading } = useUILibraryBlocks();
  const coreBlocks = useCoreBlocks();
  const customBlocks = filter(values(coreBlocks), { category: "custom" });
  const customGroupsList: Record<string, any[]> = groupBy(customBlocks, "group");
  const groupsList: Record<string, any[]> = groupBy(predefinedBlocks, "group");

  const [timeoutId, setTimeoutId] = useState<any>(null);
  const mergedGroups = useMemo(() => {
    return mergeWith(customGroupsList, groupsList, (a: any, b: any) => {
      // Concatenate arrays for the same key
      if (isArray(a) && isArray(b)) return [...a, ...b];
    });
  }, [customGroupsList, groupsList]);

  const [, setAddBlocks] = useAtom(addBlocksModalAtom);
  const [selectedGroup, setGroup] = useState("Navbar");
  const blocks = get(mergedGroups, selectedGroup, []);

  return (
    <div className="relative flex h-full max-h-full overflow-hidden py-2">
      <ul className="sticky top-0 h-full w-48 space-y-1 overflow-y-auto border-r px-2">
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
            map(mergedGroups, (groupedBlocks, group) => (
              <li
                onMouseOut={() => {
                  clearTimeout(timeoutId);
                  setTimeoutId(null);
                }}
                onMouseEnter={() => {
                  const timeout = setTimeout(() => {
                    setGroup(group);
                  }, 300);
                  setTimeoutId(timeout);
                }}
                onClick={() => setGroup(group)}
                className={cn(
                  "-mx-2 cursor-default rounded-md rounded-r-none px-2 py-1 text-sm font-medium capitalize",
                  selectedGroup === group ? "bg-blue-500 text-white" : " text-gray-700 hover:bg-foreground/10",
                )}>
                {group}
              </li>
            )),
          )
        )}
      </ul>
      <div className="h-full w-full space-y-2 overflow-y-auto px-8">
        {React.Children.toArray(
          blocks.map((block) => <BlockCard block={block} closePopover={() => setAddBlocks(false)} />),
        )}
      </div>
    </div>
  );
};
