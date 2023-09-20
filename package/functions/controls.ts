import { each, forIn, get, has, includes, isEmpty, map, set } from "lodash";
import {
  IControlDefinition,
  IListControlDefinition,
  IModelControlDefinition,
  IStylesControlDefinition,
  TControlDefinition,
} from "../controls/controls";
import { generateUUID } from "./functions";
import { I18N_KEY, SLOT_KEY } from "../constants/CONTROLS";

export const getBlockJSONFromUISchemas = (control: TControlDefinition, activeLang: string = "") => {
  switch (control.type) {
    case "singular":
      return (control as IControlDefinition).uiSchema;
    case "model":
      // eslint-disable-next-line no-case-declarations
      const { properties: modelProperties } = control as IModelControlDefinition;
      // eslint-disable-next-line no-case-declarations
      const modelProps = {};
      Object.keys(modelProperties).forEach((key) => {
        // eslint-disable-next-line no-shadow
        const control = modelProperties[key];
        if (includes(["slot", "styles"], control.type)) return;
        const propKey = get(control, "i18n", false) ? `${key}-${activeLang}` : key;
        modelProps[propKey] = getBlockJSONFromUISchemas(control, activeLang);
      });
      return modelProps;
    case "list":
      // eslint-disable-next-line no-case-declarations
      const { itemProperties } = control as IListControlDefinition;
      // eslint-disable-next-line no-case-declarations
      const listProps = {
        items: {},
      };
      Object.keys(itemProperties).forEach((key) => {
        // eslint-disable-next-line no-shadow
        const control = itemProperties[key];
        if (includes(["slot", "styles"], control.type)) return;
        const propKey = get(control, "i18n", false) ? `${key}-${activeLang}` : key;
        listProps.items[propKey] = getBlockJSONFromUISchemas(control, activeLang);
      });
      return listProps;
    default:
      return {};
  }
};

export const getBlockJSONFromSchemas = (control: TControlDefinition, activeLang: string = "") => {
  switch (control.type) {
    case "singular":
      return (control as IControlDefinition).schema;
    case "model":
      // eslint-disable-next-line no-case-declarations
      const { properties: modelProperties, title: modelTitle } = control as IModelControlDefinition;
      // eslint-disable-next-line no-case-declarations
      const modelProps = {
        title: modelTitle,
        type: "object",
        properties: {},
      };
      Object.keys(modelProperties).forEach((key) => {
        // eslint-disable-next-line no-shadow
        const control = modelProperties[key];
        if (includes(["slot", "styles"], control.type)) return;
        const propKey = get(control, "i18n", false) ? `${key}-${activeLang}` : key;
        modelProps.properties[propKey] = getBlockJSONFromSchemas(control, activeLang);
      });
      return modelProps;
    case "list":
      // eslint-disable-next-line no-case-declarations
      const { itemProperties, title: listTitle } = control as IListControlDefinition;
      // eslint-disable-next-line no-case-declarations
      const listProps = {
        title: listTitle,
        type: "array",
        items: {
          type: "object",
          properties: {},
        },
      };
      Object.keys(itemProperties).forEach((key) => {
        // eslint-disable-next-line no-shadow
        const control = itemProperties[key];
        if (includes(["slot", "styles"], control.type)) return;
        const propKey = get(control, "i18n", false) ? `${key}-${activeLang}` : key;
        listProps.items.properties[propKey] = getBlockJSONFromSchemas(control, activeLang);
        set(listProps.items, "title", get(control, "itemTitle", `${listTitle} item`));
      });
      return listProps;
    default:
      return {};
  }
};

export const getBlockDefaultProps = (propDefinitions: { [key: string]: TControlDefinition }) => {
  const defaultProps = {};
  Object.keys(propDefinitions).forEach((key) => {
    defaultProps[key] = getBlockDefaultProp(propDefinitions[key]);
  });
  return defaultProps;
};

const getListDefaults = (control: IListControlDefinition) => {
  if (isEmpty(control.default)) return [];
  const { itemProperties } = control;
  return map(control.default, (item: any) => {
    const i = { ...item };
    forIn(item, (value: any, key: string) => {
      if (has(itemProperties, key) && get(itemProperties[key], "i18n", false)) {
        i[key] = I18N_KEY;
      }
    });
    return i;
  });
};

export const getBlockDefaultProp = (control: TControlDefinition) => {
  switch (control.type) {
    case "styles":
      return (control as IStylesControlDefinition).default;
    case "slot":
      return `${SLOT_KEY}${generateUUID()}`;
    case "singular":
      // eslint-disable-next-line no-case-declarations
      const { i18n, schema } = control as IControlDefinition;
      return i18n ? I18N_KEY : get(schema, "default", "");
    case "model":
      return getBlockDefaultProps((control as IModelControlDefinition).properties);
    case "list":
      return getListDefaults(control as IListControlDefinition);
    default:
      return "";
  }
};

export const getBlockDefaultTranslations = (
  propDefinitions: Record<string, TControlDefinition>,
  blockId: string,
  primaryLang: string,
  path: string[] = []
) => {
  let defaultTranslations = {};
  Object.keys(propDefinitions).forEach((key) => {
    defaultTranslations = {
      ...defaultTranslations,
      ...getBlockDefaultTranslation(propDefinitions[key], blockId, primaryLang, [...path, key]),
    };
  });
  return defaultTranslations;
};

const getListTranslations = (control: IListControlDefinition, blockId: string, primaryLang: string, path: string[]) => {
  if (isEmpty(control.default)) return [];
  const translations = {};
  const { itemProperties } = control;
  each(control.default, (item: any, index: number) => {
    const i = { ...item };
    forIn(item, (value: any, key: string) => {
      if (has(itemProperties, key) && get(itemProperties[key], "i18n", false)) {
        if (get(value, "i18n", false)) {
          forIn(value, (v: any, k: string) => {
            if (k === "i18n") return;
            translations[`${k}:${blockId}:${[...path, index, key].join(".")}`] = v;
          });
        } else {
          translations[`${primaryLang}:${blockId}:${[...path, index, key].join(".")}`] = value;
        }
      }
    });
    return i;
  });
  return translations;
};

const getSingleTranslation = (control: IControlDefinition, blockId: string, primaryLang: string, path: string[]) => {
  if (!control.i18n) return {};
  const {
    schema: { default: defaultValue },
  } = control;
  if (get(defaultValue, "i18n", false)) {
    const translations = {};
    forIn(defaultValue, (value: any, key: string) => {
      if (key === "i18n") return;
      translations[`${key}:${blockId}:${path.join(".")}`] = value;
    });
    return translations;
  }
  return { [`${primaryLang}:${blockId}:${path.join(".")}`]: defaultValue };
};

export const getBlockDefaultTranslation = (
  control: TControlDefinition,
  blockId: string,
  primaryLang: string,
  path: string[]
) => {
  switch (control.type) {
    case "styles":
    case "slot":
      return {};
    case "singular":
      return getSingleTranslation(control as IControlDefinition, blockId, primaryLang, path);
    case "model":
      return getBlockDefaultTranslations((control as IModelControlDefinition).properties, blockId, primaryLang, path);
    case "list":
      return getListTranslations(control as IListControlDefinition, blockId, primaryLang, path);
    default:
      return "";
  }
};
