import { useMemo } from "react";
import { Toggle, Tooltip, TooltipContent, TooltipTrigger } from "../../radix-ui";
import { useSavePage } from "../../hooks";
import { Check } from "lucide-react";

export const SaveButton = () => {
  const { savePage, syncState } = useSavePage();

  const classes = useMemo(() => {
    switch (syncState) {
      case "SAVING":
        return "animate-pulse bg-gray-500 text-gray-900";
      case "SAVED":
        return "bg-green-500 text-white hover:bg-green-600 hover:text-white";
      default:
        return "bg-gray-200 text-gray-500 hover:bg-gray-100";
    }
  }, [syncState]);

  return (
    <div className="flex items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            onClick={() => savePage()}
            className={`flex h-auto w-20 items-center gap-x-1 rounded-full p-1 px-2 ${classes}`}
            size="sm"
            variant="outline">
            <svg fill="currentColor" width="16" height="16" viewBox="0 0 0.32 0.32" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M.274.086a.02.02 0 0 1 0 .028l-.12.12a.02.02 0 0 1-.028 0l-.06-.06A.02.02 0 0 1 .094.146L.14.192.246.086a.02.02 0 0 1 .028 0Z"
              />
            </svg>
            {syncState === "SAVING" ? "Saving..." : syncState === "SAVED" ? "Saved" : "Save"}
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>{syncState === "SAVING" ? "Saving..." : syncState === "SAVED" ? "Saved" : "Save changes"}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
