import * as React from "react";
import { ScrollArea } from "@/sdk/package";
import { useProject } from "../../hooks/useProject";
import { TProjectData } from "../../types";
import Form from "../common/Form";
import { Image, SingleLineText } from "@/sdk/package/controls";

const WebsiteGeneralSettings = ({
  _projectData,
  setProjectData,
}: {
  _projectData: TProjectData;
  setProjectData: (pd: any) => any;
}): React.JSX.Element => {
  const { data: projectData, isLoading } = useProject();
  // const [_projectData, _setProjectData] = React.useState(projectData as TProjectData);

  React.useEffect(() => {
    if (projectData) setProjectData(projectData);
  }, [projectData, setProjectData]);

  const updateProjectRealtime = ({ formData }: any, key?: string) => {
    setProjectData((currentData: TProjectData) => ({
      ...currentData,
      [key as string]: formData[key as string],
    }));
  };

  const properties = {
    project_name: SingleLineText({ title: "Project Name", default: projectData?.project_name }),
    favicon: Image({ title: "Favicon", default: projectData?.favicon }),
    // primary_language: SelectOption({
    //   title: "Default Language",
    //   default: projectData?.primary_language || "en",
    //   options: ["en", "es", "fr"].map((lang) => ({ value: lang, title: lang })),
    // }),
  };

  return (
    <ScrollArea className="flex h-full select-none flex-col">
      <Form properties={properties} disabled={isLoading} formData={_projectData} onChange={updateProjectRealtime} />
    </ScrollArea>
  );
};

export default WebsiteGeneralSettings;
