import { find } from "lodash";
import { Button } from "../../package";
import { usePages } from "../hooks/usePages";
import { usePublishPage } from "../mutations/usePageActions";
import { useCurrentPage } from "../store";
import { useProject } from "../hooks/useProject";

const PublishButton = () => {
  const { data: pages } = usePages();
  const [currentPageUid] = useCurrentPage();
  const { mutate, isLoading } = usePublishPage();
  const { data: project } = useProject();
  const publishPage = () => {
    const page: { slug: string } = find(pages, { uuid: currentPageUid }) as { slug: string };
    const slug = currentPageUid === project?.homepage ? "_home" : page.slug;
    mutate(slug);
  };
  return (
    <div>
      <Button disabled={isLoading} onClick={publishPage}>
        {isLoading ? "Publishing..." : "Publish"}
      </Button>
    </div>
  );
};

export default PublishButton;
