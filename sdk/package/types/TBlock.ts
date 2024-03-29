export type TBlock = {
  _id: string;
  _name?: string;
  _parent?: string | null | undefined;
  _bindings?: Record<string, string>;
  _attrs?: Record<string, string>;
  readonly _type: string;
} & Record<string, string>;

export type TGlobalBlock = Record<string, any>;

export type TProjectSettings = Record<string, any>;
