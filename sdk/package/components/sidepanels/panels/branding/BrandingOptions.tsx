import * as React from "react";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import Form, { IChangeEvent } from "@rjsf/core";
import { useBrandingOptions } from "../../../../hooks/useBrandingOptions";
import { Color, Numeric, SelectOption } from "../../../../controls/controls";
import { useBuilderProp } from "../../../../hooks/useBuilderProp";

const FONTS = [
  { title: "Roboto", value: "Roboto" },
  { title: "Open Sans", value: "Open Sans" },
  { title: "Montserrat", value: "Montserrat" },
  { title: "Lato", value: "Lato" },
  { title: "Poppins", value: "Poppins" },
  { title: "Oswald", value: "Oswald" },
  { title: "Raleway", value: "Raleway" },
  { title: "Ubuntu", value: "Ubuntu" },
  { title: "Nunito", value: "Nunito" },
  { title: "Merriweather", value: "Merriweather" },
  { title: "Nunito Sans", value: "Nunito Sans" },
  { title: "Playfair Display", value: "Playfair Display" },
  { title: "Rubik", value: "Rubik" },
  { title: "Inter", value: "Inter" },
  { title: "Lora", value: "Lora" },
  { title: "Kanit", value: "Kanit" },
  { title: "Fira Sans", value: "Fira Sans" },
  { title: "Hind", value: "Hind" },
  { title: "Quicksand", value: "Quicksand" },
  { title: "Mulish", value: "Mulish" },
  { title: "Barlow", value: "Barlow" },
  { title: "Inconsolata", value: "Inconsolata" },
  { title: "Titillium Web", value: "Titillium Web" },
  { title: "Heebo", value: "Heebo" },
  { title: "IBM Plex Sans", value: "IBM Plex Sans" },
  { title: "DM Sans", value: "DM Sans" },
  { title: "Nanum Gothic", value: "Nanum Gothic" },
  { title: "Karla", value: "Karla" },
  { title: "Arimo", value: "Arimo" },
  { title: "Cabin", value: "Cabin" },
  { title: "Oxygen", value: "Oxygen" },
  { title: "Overpass", value: "Overpass" },
  { title: "Assistant", value: "Assistant" },
  { title: "Tajawal", value: "Tajawal" },
  { title: "Play", value: "Play" },
  { title: "Exo", value: "Exo" },
  { title: "Cinzel", value: "Cinzel" },
  { title: "Faustina", value: "Faustina" },
  { title: "Philosopher", value: "Philosopher" },
  { title: "Gelasio", value: "Gelasio" },
  { title: "Sofia Sans Condensed", value: "Sofia Sans Condensed" },
  { title: "Noto Sans Devanagari", value: "Noto Sans Devanagari" },
  { title: "Actor", value: "Actor" },
  { title: "Epilogue", value: "Epilogue" },
  { title: "Glegoo", value: "Glegoo" },
  { title: "Overlock", value: "Overlock" },
  { title: "Lustria", value: "Lustria" },
  { title: "Ovo", value: "Ovo" },
  { title: "Suranna", value: "Suranna" },
];

const BrandingOptions = (): React.JSX.Element => {
  const onSaveBrandingOptions = useBuilderProp("onSaveBrandingOptions", async () => {});
  const [brandingOptions, setBrandingOptions] = useBrandingOptions();
  const brandingRef = React.useRef(brandingOptions);

  React.useEffect(() => {
    return () => onSaveBrandingOptions(brandingRef.current);
  }, [brandingRef, onSaveBrandingOptions]);

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
      options: FONTS,
    }),
    _bodyFont: SelectOption({
      title: "Body font",
      default: _bodyFont,
      options: FONTS,
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
