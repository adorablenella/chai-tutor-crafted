import { Button, Tooltip, TooltipContent, TooltipTrigger } from "../../../radix-ui";
import { usePreviewMode } from "../../../hooks";

export const Preview = () => {
  const [, setIsPreview] = usePreviewMode();
  return (
    <div className="flex items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="sm" variant="ghost" onClick={() => setIsPreview(true)}>
            <svg
              data-v-f24af897=""
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide-icon customizable h-5 w-5">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            &nbsp;Preview
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Preview</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
