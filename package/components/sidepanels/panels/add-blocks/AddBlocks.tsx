import React, { Suspense } from "react";
import { filter, groupBy, map, reject, uniq, values } from "lodash";
import { useAtom } from "jotai";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../radix-ui";
import { useCoreBlocks } from "../../../../hooks/useCoreBlocks";
import { CoreBlock } from "./CoreBlock";
import { PredefinedBlocks } from "./PredefinedBlocks";
import { showPredefinedBlockCategoryAtom } from "../../../../store/ui";
import { Skeleton } from "../../../../radix/components/ui/skeleton";

const AddBlocksPanel = () => {
  const [active, setActive] = React.useState<string>("basic");
  const coreBlocks = useCoreBlocks();
  const [, setCategory] = useAtom(showPredefinedBlockCategoryAtom);
  const onToggle = (value: string) => {
    setActive((oldValue) => (oldValue === value ? "" : value));
  };

  const groupedBlocks = groupBy(coreBlocks, "category") as { core: any[]; custom: any[] };

  return (
    <>
      <div className="bg-background/30 p-1 rounded-md">
        <h1 className="px-1 font-semibold">Add block</h1>
      </div>

      <Tabs onValueChange={() => setCategory("")} defaultValue="core" className="w-full h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="core">Core</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
          {/* <TabsTrigger value="ui-blocks">UI Blocks</TabsTrigger> */}
        </TabsList>
        <TabsContent value="core" className="h-full px-1">
          <ScrollArea>
            <Accordion type="single" value={active} className="w-full">
              {React.Children.toArray(
                uniq(map(groupedBlocks.core, "group")).map((group) => (
                  <AccordionItem value={group} className="border-border">
                    <AccordionTrigger onClick={() => onToggle(group)} className="capitalize py-2">
                      {group}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-3 gap-2">
                        {React.Children.toArray(
                          reject(filter(values(groupedBlocks.core), { group }), { hidden: true }).map((block) => (
                            <CoreBlock block={block} />
                          ))
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))
              )}
            </Accordion>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="custom" className="h-full px-1">
          <ScrollArea>
            <Accordion type="single" value={active} className="w-full">
              {React.Children.toArray(
                uniq(map(groupedBlocks.custom, "group")).map((group) => (
                  <AccordionItem value={group} className="border-border">
                    <AccordionTrigger onClick={() => onToggle(group)} className="capitalize">
                      {group}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-3 gap-2">
                        {React.Children.toArray(
                          reject(filter(values(groupedBlocks.custom), { group }), { hidden: true }).map((block) => (
                            <CoreBlock block={block} />
                          ))
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))
              )}
            </Accordion>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="ui-blocks">
          <Suspense fallback={<Skeleton className="h-32 w-full" />}>
            <PredefinedBlocks />
          </Suspense>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default AddBlocksPanel;
