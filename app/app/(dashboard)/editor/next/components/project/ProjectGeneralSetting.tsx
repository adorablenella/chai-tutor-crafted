import * as React from "react";
import { Image, ScrollArea, SingleLineText } from "../../../package";
import { useProject } from "../../hooks/useProject";
import { TProjectData } from "../../types";
import Form from "../common/Form";

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
  }, [projectData]);

  const updateProjectRealtime = ({ formData }, key?: string) => {
    setProjectData((currentData: TProjectData) => ({
      ...currentData,
      [key]: formData[key],
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
    <ScrollArea className="h-full flex flex-col select-none">
      <Form properties={properties} disabled={isLoading} formData={_projectData} onChange={updateProjectRealtime} />
    </ScrollArea>
  );
};

export default WebsiteGeneralSettings;
