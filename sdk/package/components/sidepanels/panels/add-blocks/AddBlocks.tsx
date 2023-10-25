import React, { Suspense, useEffect, useState } from "react";
import { filter, find, first, groupBy, includes, isEmpty, map, reject, uniq, values } from "lodash";
import { useAtom } from "jotai";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  ScrollArea,
  Tabs,
  TabsList,
  TabsTrigger,
} from "../../../../radix-ui";
import { useCoreBlocks } from "../../../../hooks/useCoreBlocks";
import { CoreBlock } from "./CoreBlock";
import { PredefinedBlocks } from "./PredefinedBlocks";
import { showPredefinedBlockCategoryAtom } from "../../../../store/ui";
import { Skeleton } from "../../../../radix/components/ui/skeleton";
import ImportHTML from "@/sdk/package/components/sidepanels/panels/add-blocks/ImportHTML";
import { useAllBlocks, useSelectedBlockIds } from "@/sdk/package/hooks";
import { TBlock } from "@/sdk/package/types";
import { addBlocksModalAtom } from "@/sdk/package/store/blocks";

/**
 *
 * Checking which block to show in add block list
 *
 */
const notAllowedInRoot = ["ListItem", "TableHead", "TableBody", "TableRow", "TableCell", "Column"];
const isAllowedBlockType = (block: TBlock | null | undefined, type: string) => {
  if (!block) return !includes(notAllowedInRoot, type);

  const parentType = block._type;
  if (parentType === "List") return type === "ListItem";
  else if (parentType === "Table") return type === "TableHead" || type === "TableBody";
  else if (parentType === "TableHead" || parentType === "TableBody") return type === "TableRow";
  else if (parentType === "TableRow") return type === "TableCell";
  else if (parentType === "Row") return type === "Column";
  return !includes(notAllowedInRoot, type);
};

const AddBlocksPanel = () => {
  const [tab, setTab] = useState<string>("core");
  const [active, setActive] = useState<string>("basic");
  const coreBlocks = useCoreBlocks();
  const [, setCategory] = useAtom(showPredefinedBlockCategoryAtom);
  const [, setAddBlocks] = useAtom(addBlocksModalAtom);

  const [ids] = useSelectedBlockIds();
  const blocks = useAllBlocks();
  const block = find(blocks, { _id: first(ids) });

  const groupedBlocks = groupBy(
    filter(coreBlocks, (cBlock: any) => isAllowedBlockType(block, cBlock.type)),
    "category",
  ) as { core: any[]; custom: any[] };

  const uniqueTypeGroup = uniq(map(groupedBlocks.core, "group"));

  // * setting active tab if not already selected from current unique list
  useEffect(() => {
    if (!includes(uniqueTypeGroup, active) && !isEmpty(uniqueTypeGroup) && !isEmpty(active)) {
      setActive(first(uniqueTypeGroup) as string);
    }
  }, [uniqueTypeGroup, active]);

  const onToggle = (value: string) => setActive((oldValue) => (oldValue === value ? "" : value));

  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 flex justify-between rounded-md bg-background/30 p-1">
        <h1 className="px-1 text-2xl font-semibold">
          Add block &nbsp;
          <span className="text-xs font-normal">(Drag & drop into tree view or click to add)</span>
        </h1>
        <button onClick={() => setAddBlocks(false)} className="rounded-full border p-px px-2 text-xs text-gray-800 ">
          &times; close
        </button>
      </div>

      <Tabs
        onValueChange={(_tab) => {
          setCategory("");
          setTab(_tab);
        }}
        value={tab}
        className="h-max">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="core">Core</TabsTrigger>
          <TabsTrigger value="ui-blocks">UI Blocks</TabsTrigger>
          <TabsTrigger value="html">Import</TabsTrigger>
        </TabsList>
      </Tabs>
      {tab === "core" && (
        <ScrollArea className="-mx-1.5 h-full">
          <Accordion type="single" value={active} className="w-full px-3">
            {React.Children.toArray(
              map(uniqueTypeGroup, (group) =>
                reject(filter(values(groupedBlocks.core), { group }), { hidden: true }).length ? (
                  <AccordionItem value={group} className="border-border">
                    <AccordionTrigger onClick={() => onToggle(group)} className="py-2 capitalize">
                      {group}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-4 gap-2">
                        {React.Children.toArray(
                          reject(filter(values(groupedBlocks.core), { group }), { hidden: true }).map((block) => (
                            <CoreBlock block={block} />
                          )),
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ) : null,
              ),
            )}
          </Accordion>
        </ScrollArea>
      )}
      {tab === "ui-blocks" && (
        <Suspense fallback={<Skeleton className="h-32 w-full" />}>
          <PredefinedBlocks />
        </Suspense>
      )}
      {tab === "html" && <ImportHTML />}
    </div>
  );
};

export default AddBlocksPanel;
