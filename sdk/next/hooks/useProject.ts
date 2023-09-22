import { useQuery } from "@tanstack/react-query";
import { TProjectData } from "../types";
import { useCurrentPage } from "../store";
import { usePathname } from "next/navigation";

export const useProject = () => {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useCurrentPage();

  // @TODO: Fix me more
  const projectUuid = pathname.split("/").pop();
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
