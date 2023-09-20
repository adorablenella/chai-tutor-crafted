import { EyeClosedIcon } from "@radix-ui/react-icons";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "../../../radix-ui";
import { usePreviewMode } from "../../../hooks";

export const Preview = () => {
  const [, setIsPreview] = usePreviewMode();
  return (
    <div className="flex items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="sm" variant="ghost" onClick={() => setIsPreview(true)}>
            <EyeClosedIcon />
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
