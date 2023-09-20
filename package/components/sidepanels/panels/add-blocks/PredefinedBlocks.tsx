import { capitalize, intersection, map, toLower } from "lodash";
import { useState } from "react";
import { useAtom } from "jotai";
import { MARKETING_GROUPS } from "../../../../blocks/BlockGroups";
import { ScrollArea } from "../../../../radix/components/ui/scroll-area";
import { cn } from "../../../../radix/lib/utils";
import { showPredefinedBlockCategoryAtom } from "../../../../store/ui";
import { useUILibraryBlocks } from "../../../../hooks/useUiLibraries";
import { Skeleton } from "../../../../radix/components/ui/skeleton";

export const PredefinedBlocks = () => {
  const { data: predefinedBlocks, isLoading } = useUILibraryBlocks();
  const [selectedGroup, setSelectedGroup] = useState(MARKETING_GROUPS[0]);
  const [, setCategory] = useAtom(showPredefinedBlockCategoryAtom);
  const groupsList: string[] = intersection(MARKETING_GROUPS, map(predefinedBlocks, "group"));

  if (isLoading) {
    return <Skeleton className="h-20" />;
  }
  return (
    <ScrollArea className="h-full relative">
      <ul className="px-4">
        {groupsList.map((group) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
          <li
            onClick={() => {
              setCategory(group);
              setSelectedGroup(group);
            }}
            key={group}
            className={cn(
              "hover:bg-gray-200 cursor-pointer rounded-lg px-2 py-1",
              selectedGroup === group ? "bg-gray-300" : ""
            )}>
            <h3 className="capitalize">{toLower(capitalize(group))}</h3>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
};
