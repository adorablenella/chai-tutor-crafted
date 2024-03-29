import * as React from "react";
import { first } from "lodash";
import { TProjectData } from "../../types";
import Form from "../common/Form";
import { MultilineText } from "@/sdk/package/controls";
import { InfoCircledIcon } from "@radix-ui/react-icons";

const CustomCodeSettings = ({
  _projectData,
  setProjectData,
}: {
  _projectData: TProjectData;
  setProjectData: (pd: any) => any;
}): React.JSX.Element => {
  const updateRealtime = ({ formData }: any, id?: string) => {
    if (id) {
      const path = id.replace("root.", "").split("/").pop() as string;
      const key: string = first(path.split(".")) as string;
      setProjectData((currentData: TProjectData) => ({
        ...currentData,
        [key]: formData[key] || "",
      }));
    }
  };

  const properties = {
    custom_code: MultilineText({
      title: " ",
      default: _projectData.custom_code || "",
      rows: 10,
      placeholder: `<script src="placeholder.js"></script>`,
    }),
  };

  return (
    <div className="flex h-full select-none flex-col">
      <p className="flex gap-x-1 px-1 text-xs">
        <InfoCircledIcon className="pt-0.5 text-blue-500" />
        Custom code is only executed on live sites and not inside builder
      </p>
      <Form properties={properties} formData={_projectData} onChange={updateRealtime} />
    </div>
  );
};

export default CustomCodeSettings;
