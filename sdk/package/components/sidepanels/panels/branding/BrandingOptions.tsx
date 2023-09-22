import * as React from "react";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import Form, { IChangeEvent } from "@rjsf/core";
import { useBrandingOptions } from "../../../../hooks";
import { Color, Numeric, SelectOption } from "../../../../controls/controls";
import { useBuilderProp } from "@/sdk/package/hooks/useBuilderProp";

const BrandingOptions = (): React.JSX.Element => {
  const onSaveBrandingOptions = useBuilderProp("onSaveBrandingOptions", async () => {});
  const [brandingOptions, setBrandingOptions] = useBrandingOptions();
  const brandingRef = React.useRef(brandingOptions);

  React.useEffect(() => () => onSaveBrandingOptions(brandingRef.current), [brandingRef, onSaveBrandingOptions]);

  const updateRealtime = ({ formData }: IChangeEvent, id?: string) => {
    if (id) {
      setBrandingOptions(formData);
      brandingRef.current = formData;
    }
  };

  const {
    _bodyFont,
    _headingFont,
    _primaryColor,
    _bodyTextDarkColor,
    _bodyTextLightColor,
    _bodyBgDarkColor,
    _secondaryColor,
    _bodyBgLightColor,
    _roundedCorners,
  }: any = brandingOptions;

  const brandingProperties: Record<string, any> = {
    _headingFont: SelectOption({
      title: "Heading font",
      default: _headingFont,
      options: [{ title: _headingFont, value: _headingFont }],
    }),
    _bodyFont: SelectOption({
      title: "Body font",
      default: _bodyFont,
      options: [{ title: _headingFont, value: _headingFont }],
    }),
    _roundedCorners: Numeric({ title: "Rounded Corner", default: parseInt(_roundedCorners, 10) }),
    _primaryColor: Color({ title: "Primary", default: _primaryColor }),
    _secondaryColor: Color({ title: "Secondary", default: _secondaryColor }),
    _bodyBgLightColor: Color({ title: "Body Background (Light)", default: _bodyBgLightColor }),
    _bodyBgDarkColor: Color({ title: "Body Background (Dark)", default: _bodyBgDarkColor }),
    _bodyTextLightColor: Color({ title: "Body Text (Light)", default: _bodyTextDarkColor }),
    _bodyTextDarkColor: Color({ title: "Body Text (Dark)", default: _bodyTextLightColor }),
    // TODO: exteend more options from user
  };

  const propsSchema: RJSFSchema = {
    type: "object",
    properties: {},
  };
  const uiSchema: UiSchema = {};

  // TODO: Check for nested properties inside List and Model
  Object.keys(brandingProperties).forEach((key) => {
    const property = brandingProperties[key];
    if (!propsSchema.properties) propsSchema.properties = {};
    propsSchema.properties[key] = property.schema;
    uiSchema[key] = property.uiSchema;
    return true;
  });

  return (
    <div className="flex h-full select-none flex-col">
      <div className="rounded-md bg-background/30 p-1">
        <h1 className="px-1 font-semibold">Branding Options</h1>
      </div>
      <div className="-mx-2">
        <Form
          idSeparator="."
          autoComplete="off"
          omitExtraData
          liveOmit
          liveValidate
          uiSchema={uiSchema}
          schema={propsSchema}
          formData={brandingOptions}
          validator={validator}
          onChange={updateRealtime}
        />
      </div>
    </div>
  );
};

export default BrandingOptions;
