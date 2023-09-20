import * as React from "react";
import { first } from "lodash";
import { MultilineText } from "../../../package";
import { TProjectData } from "../../types";
import Form from "../common/Form";

const CustomCodeSettings = ({
  _projectData,
  setProjectData,
}: {
  _projectData: TProjectData;
  setProjectData: (pd: any) => any;
}): React.JSX.Element => {
  const updateRealtime = ({ formData }, id?: string) => {
    if (id) {
      const path = id.replace("root.", "").split("/").pop() as string;
      const key: string = first(path.split(".")) as string;
      setProjectData((currentData: TProjectData) => ({
        ...currentData,
        [key]: formData[key],
      }));
    }
  };

  const properties = {
    custom_code: MultilineText({ title: " ", default: _projectData.custom_code || "", rows: 10 }),
  };

  return (
    <div className="flex h-full select-none flex-col">
      <Form properties={properties} formData={_projectData} onChange={updateRealtime} />
    </div>
  );
};

export default CustomCodeSettings;
