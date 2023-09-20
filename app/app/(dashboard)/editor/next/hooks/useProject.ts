import { useQuery } from "@tanstack/react-query";
import { TProjectData } from "../types";
import { useCurrentPage } from "../store";

export const useProject = () => {
  const [currentPage, setCurrentPage] = useCurrentPage();
  return useQuery({
    queryKey: ["project"],
    queryFn: async () => {
      const websiteData: TProjectData | null = await fetch("/api/chaibuilder/project").then((res) => res.json());
      if (!currentPage) {
        setCurrentPage(websiteData.homepage);
      }
      return websiteData;
    },
  });
};
