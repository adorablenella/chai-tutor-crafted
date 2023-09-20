import { useQuery } from "@tanstack/react-query";
import { useCurrentPage } from "../store";

export const usePageData = () => {
  const [currentPageUid] = useCurrentPage();
  return useQuery({
    queryKey: ["page_data", currentPageUid],
    queryFn: async () =>
      (await fetch(`/api/chaibuilder/pages?page_uuid=${currentPageUid}`).then((res) => res.json())) || {},
    enabled: !!currentPageUid,
    cacheTime: 100,
  });
};
