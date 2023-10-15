import React, { Suspense, useState } from "react";
import { filter, groupBy, map, reject, uniq, values } from "lodash";
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

const AddBlocksPanel = () => {
  const [tab, setTab] = useState<string>("core");
  const [active, setActive] = useState<string>("basic");
  const coreBlocks = useCoreBlocks();
  const [, setCategory] = useAtom(showPredefinedBlockCategoryAtom);
  const onToggle = (value: string) => {
    setActive((oldValue) => (oldValue === value ? "" : value));
  };

  const groupedBlocks = groupBy(coreBlocks, "category") as { core: any[]; custom: any[] };

  return (
    <div className="flex h-full flex-col">
      <div className="rounded-md bg-background/30 p-1">
        <h1 className="px-1 font-semibold">Add block</h1>
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
              uniq(map(groupedBlocks.core, "group")).map((group) => (
                <AccordionItem value={group} className="border-border">
                  <AccordionTrigger onClick={() => onToggle(group)} className="py-2 capitalize">
                    {group}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-3 gap-2">
                      {React.Children.toArray(
                        reject(filter(values(groupedBlocks.core), { group }), { hidden: true }).map((block) => (
                          <CoreBlock block={block} />
                        )),
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )),
            )}
          </Accordion>
        </ScrollArea>
      )}
      {tab === "ui-blocks" && (
        <ScrollArea className="relative h-full py-2">
          <Suspense fallback={<Skeleton className="h-32 w-full" />}>
            <PredefinedBlocks />
          </Suspense>
        </ScrollArea>
      )}
      {tab === "html" && <ImportHTML />}
    </div>
  );
};

export default AddBlocksPanel;
