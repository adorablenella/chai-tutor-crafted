export type TBlock = {
  [key: string]: any;
  _id: string;
  _name?: string;
  _parent?: string | null;
  readonly _type: string;
};

export type TGlobalBlock = {
  [key: string]: any;
};

export type TProjectSettings = {
  [key: string]: any;
};
