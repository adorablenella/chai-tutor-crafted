import { useCurrentPage, useCurrentPageSlug, useSyncState } from "../store";
import { useBuilderReset } from "@/sdk/package/hooks";
import { TPageData } from "../types";
import { toast } from "@/sdk/package/radix-ui";

export const useChangePage = () => {
  const [syncStatus] = useSyncState();
  const [currentPageUid, setCurrentPage] = useCurrentPage();
  const [, setCurrentPageSlug] = useCurrentPageSlug();
  const resetBuilder = useBuilderReset();
  return (page: Pick<TPageData, "uuid" | "slug">) => {
    if (syncStatus === "UNSAVED") {
      toast({ variant: "destructive", title: "Please save unsaved changes" });
      return false;
    }
    if (currentPageUid === page.uuid) return false;
    resetBuilder();
    setTimeout(() => {
      setCurrentPage(page.uuid);
      setCurrentPageSlug(page.slug);
    }, 100);
    return true;
  };
};
