import React, { Suspense, useEffect, useRef } from "react";
import { isEmpty, isEqual } from "lodash";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/sdk/package/radix-ui";
import { useUpdateProject } from "../mutations/useProjectActions";
import { TProjectData } from "../types";
import { useProject } from "../hooks/useProject";

const ProjectGeneralSetting = React.lazy(() => import("../components/project/ProjectGeneralSetting"));
const ProjectSeoSettings = React.lazy(() => import("../components/project/ProjectSeoSettings"));
const ProjectCustomCode = React.lazy(() => import("../components/project/ProjectCustomCode"));

const withEmptySeoData = (projectData: TProjectData): TProjectData => {
  if (projectData && isEmpty(projectData.seo_data)) {
    return {
      ...projectData,
      seo_data: { title: "", description: "", image: "" },
    };
  }
  return projectData;
};

export default function ProjectSettings() {
  const updateProject = useUpdateProject();
  const { data: projectData } = useProject();
  const [_projectData, setProjectData] = React.useState(
    projectData ? withEmptySeoData(projectData) : withEmptySeoData({} as TProjectData),
  );
  const dateRef = useRef(_projectData);

  useEffect(
    () => () => {
      if (!isEqual(projectData, dateRef.current)) {
        // @ts-ignore
        updateProject.mutate(dateRef.current, { onSuccess: () => setProjectData(dateRef.current) });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dateRef],
  );

  useEffect(() => {
    dateRef.current = _projectData;
  }, [_projectData]);

  return (
    <>
      <div className="flex items-center justify-between rounded-md bg-background/30 p-1">
        <h1 className="px-1 font-semibold">Website Settings</h1>
      </div>
      <hr className="-mx-1" />
      <div className="-mx-1">
        <Accordion type="single" className="w-full" defaultValue="GENERAL">
          <AccordionItem value="GENERAL" className="border-b-2 border-slate-100 dark:border-slate-800">
            <AccordionTrigger className="bg-slate-200 px-2.5 py-1.5 font-medium hover:bg-slate-100 hover:no-underline dark:bg-slate-900 dark:hover:bg-slate-800">
              General Settings
            </AccordionTrigger>
            <AccordionContent className="px-2 pt-4 text-sm">
              <Suspense fallback={<div className="-my-2 h-52 w-full animate-pulse bg-gray-100" />}>
                <ProjectGeneralSetting _projectData={_projectData} setProjectData={setProjectData} />
              </Suspense>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="SEO" className="border-b-2 border-slate-100 dark:border-slate-800">
            <AccordionTrigger className="bg-slate-200 px-2.5 py-1.5 font-medium hover:bg-slate-100 hover:no-underline dark:bg-slate-900 dark:hover:bg-slate-800">
              SEO Settings
            </AccordionTrigger>
            <AccordionContent className="px-1 pt-4 text-sm">
              <Suspense fallback={<div className="-my-2 h-52 w-full animate-pulse bg-gray-100" />}>
                <ProjectSeoSettings _projectData={_projectData} setProjectData={setProjectData} />
              </Suspense>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="CUSTOM">
            <AccordionTrigger className="bg-slate-200 px-2.5 py-1.5 font-medium hover:bg-slate-100 hover:no-underline dark:bg-slate-900 dark:hover:bg-slate-800">
              Custom Code
            </AccordionTrigger>
            <AccordionContent className="px-1 pt-4 text-sm">
              <Suspense fallback={<div className="-my-2 h-52 w-full animate-pulse bg-gray-100" />}>
                <ProjectCustomCode _projectData={_projectData} setProjectData={setProjectData} />
              </Suspense>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
