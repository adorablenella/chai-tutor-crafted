import { TBlock } from "./TBlock";

export interface CoreBlock {
  blocks?: TBlock[];
  data: any;
  props: { [key: string]: any };
  type: string;
}

export interface PredefinedBlock {
  type: string;
}
