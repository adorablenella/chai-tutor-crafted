import React, { Suspense, useState } from "react";
import { ChevronRightIcon, FileTextIcon, GearIcon, HomeIcon } from "@radix-ui/react-icons";
import * as PopoverRoot from "@radix-ui/react-popover";
import { TPageData } from "../../types";
import { useProject } from "../../hooks/useProject";
import { Popover, PopoverContent, PopoverTrigger } from "../../../package";
import { useCurrentPage } from "../../store";
import { useChangePage } from "../../hooks/useChangePage";

const PageDetail = React.lazy(() => import("./PageDetail"));

const SettingPopover = ({ pageData }: { pageData: TPageData }): React.ReactElement => {
  const [open, setOpen] = useState<"CLOSE" | "OPEN" | "ALERT" | "PENDING">("CLOSE");

  return (
    <Popover
      open={open === "OPEN" || open === "ALERT" || open === "PENDING"}
      onOpenChange={(_open) => {
        setOpen(open === "PENDING" ? "ALERT" : _open ? "OPEN" : "CLOSE");
      }}>
      <PopoverTrigger asChild onClick={() => setOpen("OPEN")}>
        <div className="flex items-center justify-between">
          {open === "OPEN" || open === "ALERT" || open === "PENDING" ? (
            <ChevronRightIcon />
          ) : (
            <div className="hidden group-hover:flex hover:text-blue-600">
              <GearIcon />
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverRoot.Portal>
        <PopoverContent side="right" align="start" alignOffset={-35} className="w-96 h-screen">
          <Suspense
            fallback={
              <div className="flex flex-col gap-y-3 w-full animate-pulse">
                <div className="w-1/2 h-6 bg-gray-300" />
                <div className="h-20 w-full bg-gray-300" />
                <div className="h-20 w-full bg-gray-300" />
              </div>
            }>
            <PageDetail pageData={pageData} open={open} setOpen={setOpen} />
          </Suspense>
        </PopoverContent>
      </PopoverRoot.Portal>
    </Popover>
  );
};

const SinglePage = (page: TPageData) => {
  const [currentPageUid] = useCurrentPage();
  const { data: projectData } = useProject();
  const changePage = useChangePage();
  const isHomePage = projectData.homepage === page.uuid;
  const isActivePage = currentPageUid === page.uuid;
  const handleClick = () => changePage(page);

  return (
    <button
      className={`w-full py-2 px-2.5 cursor-pointer flex relative items-center justify-between group ${
        isActivePage ? "bg-blue-200 text-gray-800" : "hover:bg-slate-50 text-gray-600"
      }`}
      onClick={handleClick}
      type="button">
      <div className="flex items-center gap-x-1.5">
        {isHomePage ? <HomeIcon /> : <FileTextIcon />} {page.page_name}
      </div>
      <SettingPopover pageData={page} />
    </button>
  );
};

const PagesViewer = ({ pages, isLoading }: { isLoading: boolean; pages: TPageData[] }) => {
  if (isLoading)
    return (
      <div className="animate-pulse flex flex-col gap-y-1 px-2.5 pt-2">
        <div className="h-7 w-full bg-gray-200" />
        <div className="h-7 w-full bg-gray-200" />
        <div className="h-7 w-full bg-gray-200" />
      </div>
    );
  if (pages.length === 0) return <div className="px-2.5 pt-4 pb-2">No pages</div>;
  return <div className="-mb-2">{React.Children.toArray(pages.map((page) => <SinglePage {...page} />))}</div>;
};

export default PagesViewer;
