import { useQuery } from "@tanstack/react-query";
import { TProjectData } from "../types";
import { useCurrentPage } from "../store";

export const useProject = () => {
  const [currentPage, setCurrentPage] = useCurrentPage();
  const projectUuid = "175ac8d8-37fe-4707-bb4a-3c0cd6a6db75";
  return useQuery({
    queryKey: ["project", projectUuid],
    queryFn: async () => {
      const websiteData: TProjectData | null = await fetch(`/api/chaibuilder/project?project_uuid=${projectUuid}`).then(
        (res) => res.json(),
      );
      if (!currentPage && websiteData) {
        setCurrentPage(websiteData.homepage);
      }
      return websiteData;
    },
  });
};
