import { omit } from "lodash";
import { GLOBAL_DATA_KEY, STYLES_KEY } from "../constants/CONTROLS";

export interface IControlDefinition {
  default?: any;
  i18n: boolean;
  itemProperties?: { [key: string]: IControlDefinition };
  properties?: { [key: string]: IControlDefinition };
  required?: boolean;
  schema: any;
  type: "slots" | "singular" | "list" | "model" | "styles";
  uiSchema: any;
}

export interface IStylesControlDefinition {
  default: any;
  type: string;
}

export interface IModelControlDefinition {
  default: any;
  properties: { [key: string]: IControlDefinition | IModelControlDefinition | IListControlDefinition };
  title: string;
  type: string;
}

export interface ISlotControlDefinition {
  count: number;
  styles: string;
  type: string;
}

export type TControlDefinition =
  | IControlDefinition
  | ISlotControlDefinition
  | IStylesControlDefinition
  | IModelControlDefinition
  | IListControlDefinition;

export interface IListControlDefinition {
  default: any;
  itemProperties: { [key: string]: IControlDefinition | IModelControlDefinition };
  itemTitle?: Function;
  title: string;
  type: string;
}

type TControlProps = {
  [key: string]: any;
  default?: any;
  i18n?: boolean;
  required?: boolean;
  title: string;
};

type TInputProps = TControlProps & {
  format?: "email" | "uri" | "data-url";
};

/**
 * Input control
 * @param props
 * @constructor
 */
export const SingleLineText = (props: TInputProps) =>
  ({
    type: "singular",
    i18n: props.i18n || false,
    required: props.required || false,
    schema: {
      type: "string",
      ...omit(props, ["i18n", "required"]),
    },
    uiSchema: {
      "ui:placeholder": "Enter here",
    },
  }) as IControlDefinition;

type TTextAreaProps = TControlProps & {
  rows?: number;
};

/**
 * TextArea control
 * @param props
 * @constructor
 */
export const MultilineText = (props: TTextAreaProps) =>
  ({
    type: "singular",
    i18n: props.i18n || false,
    required: props.required || false,
    schema: {
      type: "string",
      ...omit(props, ["i18n", "required", "rows"]),
    },
    uiSchema: {
      "ui:widget": "textarea",
      "ui:options": {
        rows: props.rows || 4,
      },
    },
  }) as IControlDefinition;

type TCheckboxProps = TControlProps;

/**
 * Checkbox control
 * @param props
 * @constructor
 */
export const Checkbox = (props: TCheckboxProps) =>
  ({
    type: "singular",
    i18n: props.i18n || false,
    schema: {
      type: "boolean",
      ...omit(props, ["i18n", "required"]),
    },
    uiSchema: {
      "ui:widget": "checkbox",
    },
  }) as IControlDefinition;

type TNumberProps = TControlProps & {
  enum?: number[];
  maximum?: number;
  minimum?: number;
  multipleOf?: number;
};
export const Numeric = (props: TNumberProps) =>
  ({
    type: "singular",
    i18n: props.i18n || false,
    required: props.required || false,
    schema: {
      type: "number",
      ...omit(props, ["i18n", "required"]),
    },
    uiSchema: {},
  }) as IControlDefinition;

type TSelectProps = TControlProps & {
  options: { title: string; value: string }[];
  widget?: "select";
};
export const SelectOption = (props: TSelectProps) =>
  ({
    type: "singular",
    i18n: props.i18n || false,
    required: props.required || false,
    schema: {
      type: "string",
      ...omit(props, ["i18n", "required", "options"]),
      oneOf: props.options.map((option) => ({ const: option.value, title: option.title })),
    },
    uiSchema: {
      "ui:widget": "select",
    },
  }) as IControlDefinition;

export const Color = (props: TControlProps) =>
  ({
    type: "singular",
    schema: {
      type: "string",
      ...omit(props, ["i18n", "required"]),
    },
    uiSchema: {
      "ui:widget": "color",
    },
  }) as IControlDefinition;

type TSlotsProps = {
  count: number;
  name: string;
  styles?: string;
};

export const Slot = (props: Omit<TSlotsProps, "count">) =>
  ({
    type: "slot",
    count: 1,
    name: props.name,
    styles: `${STYLES_KEY},${props.styles || ""}`,
  }) as ISlotControlDefinition;

export const RichText = (props: TControlProps) =>
  ({
    type: "singular",
    i18n: props.i18n || false,
    schema: {
      type: "string",
      ...omit(props, ["i18n", "required"]),
    },
    uiSchema: {
      "ui:widget": "richtext",
    },
  }) as IControlDefinition;

type TModelProps = TControlProps & {
  properties: {
    [key: string]: any;
  };
};

export const Model = (props: TModelProps) =>
  ({
    type: "model",
    title: props.title,
    default: props.default || {},
    properties: props.properties,
  }) as IModelControlDefinition;

type TListProps = TControlProps & {
  getItemLabel?: (item: any) => string;
  itemProperties: { [key: string]: any };
};

export const List = (props: TListProps) =>
  ({
    type: "list",
    itemProperties: props.itemProperties,
    title: props.title,
    default: props.default || [],
    itemTitle: props.getItemLabel ? props.getItemLabel({}) : () => "",
  }) as IListControlDefinition;

type TStylesProps = {
  default?: string;
};

export const Styles = (props: TStylesProps) =>
  ({
    type: "styles",
    default: `${STYLES_KEY},${props.default || ""}`,
  }) as IStylesControlDefinition;

export const Icon = (props: TControlProps) =>
  ({
    type: "singular",
    schema: {
      type: "string",
      title: "Icon",
      default: props.default || "",
    },
    uiSchema: {
      "ui:widget": "icon",
    },
  }) as IControlDefinition;

type TLinkProps = TControlProps & {
  default: {
    href: string;
    target: string | "_self" | "_blank" | "_parent" | "_top";
    type: string | "page" | "url" | "email" | "telephone" | "scroll";
  };
};

export const Link = (props: TLinkProps) =>
  ({
    type: "singular",
    schema: {
      type: "object",
      title: props.title || "Link",
      default: props.default || { href: "#", target: "_self", type: "url" },
      properties: {
        type: {
          type: "string",
          title: "Icon Position",
          oneOf: [
            { const: "page", title: "Open Page" },
            { const: "url", title: "Open URL" },
            { const: "email", title: "Compose Email" },
            { const: "telephone", title: "Call Phone" },
            { const: "scroll", title: "Scroll to element" },
          ],
        },
        href: {
          type: "string",
        },
        target: {
          type: "string",
        },
      },
    },
    uiSchema: {
      "ui:widget": "fieldset",
      "ui:order": ["type", "href", "target"],
      type: {
        "ui:options": { label: false },
      },
      href: {
        "ui:options": { label: false },
        "ui:placeholder": "Enter URL",
      },
      target: {
        "ui:widget": "link",
        "ui:options": { label: false },
      },
    },
  }) as IControlDefinition;

export const Image = (props: TControlProps) =>
  ({
    type: "singular",
    schema: {
      type: "string",
      ...omit(props, ["i18n", "required"]),
    },
    uiSchema: {
      "ui:widget": "image",
    },
  }) as IControlDefinition;

export type TGlobalDataMapperProps = TControlProps & {
  dataType: "string" | "number" | "boolean" | "object" | "array" | "null";
};

export const GlobalDataMapper = (props: TGlobalDataMapperProps) =>
  ({
    type: "singular",
    i18n: props.i18n || false,
    required: props.required || false,
    schema: {
      type: "string",
      default: `${GLOBAL_DATA_KEY}${props.dataType}:${props.path}`,
      title: `Global Data: ${props.title}`,
    },
    uiSchema: {
      "ui:widget": "globalData",
    },
  }) as IControlDefinition;

export const i18nDefaults = (values) => ({
  i18n: true,
  ...values,
});
