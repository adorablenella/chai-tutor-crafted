export type TBlock = {
  readonly _id: string;
  _name?: string;
  _parent?: string | null;
  _bindings?: Record<string, string>;
  readonly _type: string;
} & Record<string, string>;

export type TGlobalBlock = Record<string, any>;

export type TProjectSettings = Record<string, any>;
