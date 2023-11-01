import React from "react";
import RjFrom, { IChangeEvent } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import { first, get, includes } from "lodash";
import RichTextEditorField from "../../../package/controls/widgets/RTE";
import IconPickerField from "../../../package/controls/widgets/Icon";
import ImagePickerField from "../../../package/controls/widgets/image";
import LinkField from "../../../package/controls/widgets/link";
import GlobalDataMapper from "../../../package/controls/widgets/GlobalDataMapper";
import { getBlockJSONFromSchemas, getBlockJSONFromUISchemas } from "../../../package/functions/controls";

const Form = ({
  title,
  properties = {},
  formData: _formData,
  onChange,
  disabled = false,
  activeLang = "",
}: {
  activeLang?: string;
  disabled?: boolean;
  formData: any;
  onChange: ({ formData }: any, key?: string) => void;
  properties: any;
  title?: string;
}): React.ReactElement => {
  const propsSchema: RJSFSchema = {
    type: "object",
    properties: {},
  };
  const uiSchema: UiSchema = {};

  Object.keys(properties).forEach((key) => {
    const control = properties[key];
    if (includes(["slot", "styles"], control.type)) return;
    const propKey = get(control, "i18n", false) ? `${key}-${activeLang}` : key;
    // @ts-ignore
    propsSchema.properties[propKey] = getBlockJSONFromSchemas(control, activeLang);
    uiSchema[propKey] = getBlockJSONFromUISchemas(control, activeLang);
  });

  const handleChange = ({ ...rest }: IChangeEvent, id?: string) => {
    const path = id?.replace("root.", "").split("/").pop() as string;
    if (!id || !path) return;
    const key: string = first(path.split(".")) as string;
    if (id && key) onChange({ ...rest } as any, key);
  };

  return (
    <>
      {title && <h1 className="px-1 text-sm font-semibold underline">{title}</h1>}
      <div className="-mx-3">
        <RjFrom
          widgets={{
            richtext: RichTextEditorField,
            icon: IconPickerField,
            image: ImagePickerField,
            globalData: GlobalDataMapper,
          }}
          fields={{
            link: LinkField,
          }}
          idSeparator="."
          autoComplete="off"
          omitExtraData
          liveOmit
          liveValidate
          uiSchema={uiSchema}
          schema={propsSchema}
          formData={_formData}
          validator={validator}
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
    </>
  );
};

export default Form;
