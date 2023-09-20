import { useMemo } from "react";
import { Toggle, Tooltip, TooltipContent, TooltipTrigger } from "../../radix-ui";
import { useSavePage } from "../../hooks";

export const SaveButton = () => {
  const { savePage, syncState } = useSavePage();

  const classes = useMemo(() => {
    switch (syncState) {
      case "SAVING":
        return "animate-pulse bg-gray-500 text-gray-900";
      case "SAVED":
        return "bg-green-500 text-green-800 hover:bg-green-800";
      default:
        return "bg-gray-200 text-gray-900";
    }
  }, [syncState]);

  return (
    <div className="flex items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            onClick={() => savePage()}
            className={`rounded-full p-1.5 h-auto ${classes}`}
            size="sm"
            variant="outline">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
            </svg>
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>Changes saved</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
