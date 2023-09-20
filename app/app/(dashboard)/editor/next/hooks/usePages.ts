import { useQuery } from "@tanstack/react-query";
import { TPageData } from "../types";
import { useProject } from "./useProject";

export const usePages = (): { data: TPageData[]; isLoading: boolean } => {
  const { data: project } = useProject();
  const projectId = project?.uuid;
  return useQuery({
    queryKey: ["pages", projectId],
    queryFn: async () => {
      const pages: TPageData[] = await fetch(`/api/chaibuilder/pages?project_uuid=${projectId}`).then((res) =>
        res.json()
      );
      return pages || [];
    },
    enabled: !!projectId,
  });
};
