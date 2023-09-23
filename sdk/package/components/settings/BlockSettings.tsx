import { RJSFSchema, UiSchema } from "@rjsf/utils";
import Form, { IChangeEvent } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { get, includes } from "lodash";
import { useSelectedBlock } from "../../hooks/useSelectedBlockIds";
import { useActiveLanguage, useCanvasHistory } from "../../hooks";
import { useCoreBlocks } from "../../hooks/useCoreBlocks";
import RichTextEditorField from "../../controls/widgets/RTE";
import IconPickerField from "../../controls/widgets/Icon";
import ImagePickerField from "../../controls/widgets/image";
import LinkField from "../../controls/widgets/link";
import GlobalDataMapper from "../../controls/widgets/GlobalDataMapper";
import { getBlockJSONFromSchemas, getBlockJSONFromUISchemas } from "../../functions/controls";
import { useUpdateBlocksPropsRealtime } from "../../hooks/useUpdateBlocksProps";
import { TControlDefinition } from "../../controls";

export default function BlockSettings() {
  const selectedBlock = useSelectedBlock() as any;
  const { createSnapshot } = useCanvasHistory();
  const builderBlocks = useCoreBlocks();
  const updateBlockPropsRealtime = useUpdateBlocksPropsRealtime();
  const [activeLang] = useActiveLanguage();
  const coreBlock = builderBlocks[selectedBlock._type];
  const properties = get(coreBlock, "props", {}) as { [key: string]: TControlDefinition };

  const propsSchema: RJSFSchema = {
    type: "object",
    properties: {
      _name: {
        title: "Name",
        type: "string",
        default: get(selectedBlock, "_name", selectedBlock._type),
      },
    },
  };
  const uiSchema: UiSchema = {};

  Object.keys(properties).forEach((key) => {
    const control = properties[key];
    if (includes(["slot", "styles"], control.type)) return;
    const propKey = get(control, "i18n", false) ? `${key}-${activeLang}` : key;
    propsSchema.properties[propKey] = getBlockJSONFromSchemas(control, activeLang);
    uiSchema[propKey] = getBlockJSONFromUISchemas(control, activeLang);
  });

  const formData = { ...selectedBlock };

  const updateRealtime = ({ formData: newData }: IChangeEvent, id?: string) => {
    if (id) {
      const path = id.replace("root.", "") as string;
      // TODO: check the key if it's a multi lang field
      // TODO: get the current lang key and append it to key
      updateBlockPropsRealtime([selectedBlock._id], { [path]: get(newData, path) });
    }
  };

  const createHistorySnapshot = () => {
    createSnapshot();
  };

  return (
    <Form
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
      omitExtraData={false}
      liveOmit={false}
      liveValidate
      uiSchema={uiSchema}
      onBlur={createHistorySnapshot}
      schema={propsSchema}
      formData={formData}
      validator={validator}
      onChange={updateRealtime}
    />
  );
}
