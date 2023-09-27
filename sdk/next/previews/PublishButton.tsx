import { find } from "lodash";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "../../package";
import { usePages } from "../hooks/usePages";
import { usePublishPage } from "../mutations/usePageActions";
import { useCurrentPage, useSyncState } from "../store";
import { useProject } from "../hooks/useProject";

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

  if (syncStatus !== "SAVED") {
    return (
      <Tooltip delayDuration={500}>
        <TooltipTrigger asChild>
          <Button className="cursor-not-allowed opacity-50">{isLoading ? "Publishing..." : "Publish"}</Button>
        </TooltipTrigger>
        {syncStatus !== "SAVED" && (
          <TooltipContent className="mr-4">
            <div>Save changes to publish</div>
          </TooltipContent>
        )}
      </Tooltip>
    );
  }

  return (
    <div>
      <Button disabled={isLoading || syncStatus !== "SAVED"} onClick={publishPage}>
        {isLoading ? "Publishing..." : "Publish"}
      </Button>
    </div>
  );
};

export default PublishButton;
