import { find } from "lodash";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@/sdk/package/radix-ui";
import { usePages } from "../hooks/usePages";
import { usePublishPage } from "../mutations/usePageActions";
import { useCurrentPage, useSyncState } from "../store";
import { useProject } from "../hooks/useProject";
import LoadingDots from "@/components/icons/loading-dots";

const PublishButton = () => {
  const { data: pages } = usePages();
  const [currentPageUid] = useCurrentPage();
  const { mutate, isLoading } = usePublishPage();
  const { data: project } = useProject();
  const [syncStatus] = useSyncState();

  const publishPage = () => {
    const page: { slug: string } = find(pages, { uuid: currentPageUid }) as { slug: string };
    const slug = currentPageUid === project?.homepage ? "_home" : page.slug;
    mutate(slug);
  };
  if (syncStatus !== "SAVED" || isLoading) {
    return (
      <Tooltip delayDuration={isLoading ? 0 : 500}>
        <TooltipTrigger asChild>
          <Button
            className={`w-20 cursor-not-allowed  ${
              isLoading ? "bg-gray-300 hover:bg-gray-300" : "bg-gray-400 hover:bg-gray-400"
            }`}>
            {isLoading ? <LoadingDots color="#000" /> : "Publish"}
          </Button>
        </TooltipTrigger>
        {(syncStatus !== "SAVED" || isLoading) && (
          <TooltipContent className="mr-4">
            <div>{isLoading ? "Publishing..." : "Please save your changes to publish"}</div>
          </TooltipContent>
        )}
      </Tooltip>
    );
  }

  return (
    <div>
      <Button disabled={isLoading || syncStatus !== "SAVED"} onClick={publishPage} className="w-20">
        Publish
      </Button>
    </div>
  );
};

export default PublishButton;
