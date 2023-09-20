/* eslint-disable arrow-body-style */
import React, { Suspense } from "react";
import { filter } from "lodash";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/sdk/package";
import { usePages } from "../hooks/usePages";

const AddPageModal = React.lazy(() => import("../components/pages/AddPageModal"));
const PagesViewer = React.lazy(() => import("../components/pages/PagesViewer"));

const Pages = (): React.JSX.Element => {
  const { data: pages = [], isLoading } = usePages();

  const staticPages = filter(pages, (page) => page.type === "STATIC");
  const dynamicPages = filter(pages, (page) => page.type === "DYNAMIC");

  return (
    <>
      <div className="flex items-center justify-between rounded-md bg-background/30 p-1">
        <h1 className="px-1 font-semibold">Pages</h1>
        <Suspense fallback={<div className="text-sm text-blue-500 underline">+ New Page</div>}>
          <AddPageModal />
        </Suspense>
      </div>
      <hr className="-mx-1" />
      <div className="-mx-1">
        <Accordion type="multiple" className="w-full" defaultValue={["STATIC", "DYNAMIC"]}>
          <AccordionItem value="STATIC">
            <AccordionTrigger className="bg-slate-100 px-2.5 py-1.5 font-medium hover:bg-slate-50 hover:no-underline">
              Static Pages
            </AccordionTrigger>
            <AccordionContent className="-mb-2 text-sm">
              <PagesViewer isLoading={isLoading} pages={staticPages} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="DYNAMIC">
            <AccordionTrigger className="bg-slate-100 px-2.5 py-1.5 font-medium hover:bg-slate-50 hover:no-underline">
              Dynamic Pages
            </AccordionTrigger>
            <AccordionContent className="-mb-2 text-sm">
              <PagesViewer isLoading={isLoading} pages={dynamicPages} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default Pages;
