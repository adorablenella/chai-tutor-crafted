import * as React from "react";
import Form from "../common/Form";
import { TProjectData } from "../../types";
import { Image, Model, MultilineText, SingleLineText } from "@/sdk/package/controls";

const SEOSettings = ({
  _projectData,
  setProjectData,
}: {
  _projectData: TProjectData;
  setProjectData: (pd: any) => any;
}): React.JSX.Element => {
  const updateRealtime = ({ formData }: any) => {
    // eslint-disable-next-line no-underscore-dangle
    const _formData: TProjectData = { ...formData };
    if (_formData.seo_data.title === undefined) _formData.seo_data.title = "";
    if (_formData.seo_data.description === undefined) _formData.seo_data.description = "";
    if (_formData.seo_data.image === undefined) _formData.seo_data.image = "";
    setProjectData((currentData: TProjectData) => ({
      ...currentData,
      ..._formData,
    }));
  };

  const properties = {
    seo_data: Model({
      title: "",
      default: {
        title: (_projectData.seo_data?.title || "") as string,
        description: (_projectData.seo_data?.description || "") as string,
        image: (_projectData.seo_data?.image || "") as string,
      },
      properties: {
        title: SingleLineText({ title: "Default Title", default: (_projectData.seo_data?.title || "") as string }),
        description: MultilineText({
          title: "Default Description",
          default: (_projectData.seo_data?.description || "") as string,
        }),
        image: Image({ title: "Social Media Image", default: (_projectData.seo_data?.image || "") as string }),
      },
    }),
  };

  return (
    <div className="flex h-full select-none flex-col">
      <Form properties={properties} formData={_projectData} onChange={updateRealtime} />
    </div>
  );
};

export default SEOSettings;
