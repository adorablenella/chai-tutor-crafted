import { GLOBAL_DATA_KEY } from "../constants/CONTROLS";
import { GlobalDataMapper, TGlobalDataMapperProps } from "./controls";

it("should return the correct control definition", () => {
  const props: TGlobalDataMapperProps = {
    dataType: "string",
    i18n: true,
    required: false,
    path: "path/to/globalData",
    title: "Global Data",
  };

  const controlDefinition = GlobalDataMapper(props);

  expect(controlDefinition).toEqual({
    type: "singular",
    i18n: true,
    required: false,
    schema: {
      type: "string",
      default: `${GLOBAL_DATA_KEY}${props.dataType}:${props.path}`,
      title: `Global Data: ${props.title}`,
    },
    uiSchema: {
      "ui:widget": "globalData",
    },
  });
});
