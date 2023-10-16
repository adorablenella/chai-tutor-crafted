import { useProject } from "@/sdk/next/hooks/useProject";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/sdk/package/radix-ui";
import { usePages } from "../hooks/usePages";
import { isEmpty, map } from "lodash";
import { useCurrentPage, useSyncState } from "../store";
import { toast } from "sonner";
import { useEffect } from "react";

const CurrentPage = () => {
  const { data: project } = useProject();
  const { data: pages, isLoading } = usePages();
  const [syncState] = useSyncState();
  const [currentPageUuid, setCurrentPageUuid] = useCurrentPage();

  useEffect(() => {
    return () => setCurrentPageUuid(null);
  }, [setCurrentPageUuid]);

  const changePage = (newPage: string) => {
    if (syncState !== "SAVED") {
      toast.error("You have unsaved changes. Please save before changing the page.");
    } else {
      setCurrentPageUuid(newPage);
    }
  };

  if (isLoading || isEmpty(currentPageUuid)) return null;

  return (
    <nav
      className="flex rounded-lg border border-gray-200 bg-gray-50 px-5 py-1 text-gray-700 dark:border-gray-700 dark:bg-gray-800"
      aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <div className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
            <svg
              className="mr-2.5 h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            All Sites
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <svg
              className="mx-1 h-3 w-3 text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <div className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ml-2">
              {project?.project_name}
            </div>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <svg
              className="mx-1 h-3 w-3 text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <Select value={currentPageUuid || ""} onValueChange={changePage}>
              <SelectTrigger className="h-max border-0 py-0 text-sm font-medium text-gray-600 shadow-none outline-none ring-0 focus:ring-0 dark:text-gray-400">
                <SelectValue placeholder="Page" />
              </SelectTrigger>
              <SelectContent>
                {map(pages, (page) => (
                  <SelectItem key={page.uuid} value={page.uuid}>
                    {page?.page_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default CurrentPage;
