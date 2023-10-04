import { usePageData } from "@/sdk/next/hooks/usePageData";
import { useProject } from "@/sdk/next/hooks/useProject";

const CurrentPage = () => {
  const { data: pageData, isLoading } = usePageData();
  const { data: project } = useProject();
  if (isLoading) return null;
  return (
    <nav
      className="flex rounded-lg border border-gray-200 bg-gray-50 px-5 py-1 text-gray-700 dark:border-gray-700 dark:bg-gray-800"
      aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <a
            href="#"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <svg
              className="mr-2.5 h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            All Sites
          </a>
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
            <a
              href="#"
              className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white md:ml-2">
              {project?.project_name}
            </a>
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
            <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ml-2">
              {pageData?.page_name}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default CurrentPage;
