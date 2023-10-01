import { usePageData } from "@/sdk/next/hooks/usePageData";

const CurrentPage = () => {
  const { data: pageData, isLoading } = usePageData();
  if (isLoading) return null;
  return <p className="text-sm"> Currently Editing: {pageData?.page_name}</p>;
};

export default CurrentPage;
