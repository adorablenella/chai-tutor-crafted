import React from "react";
import { TBlock } from "../types/TBlock";
import {
  IControlDefinition,
  IListControlDefinition,
  IModelControlDefinition,
  ISlotControlDefinition,
  IStylesControlDefinition,
} from "./controls";

export interface ICustomBlockOptions {
  blocks?: TBlock[];
  category?: string;
  group: string;
  preview?: string;
  hidden?: boolean;
  icon?: React.ReactNode | React.FC;
  label: string;
  props?: {
    [key: string]:
      | IControlDefinition
      | IModelControlDefinition
      | IStylesControlDefinition
      | IListControlDefinition
      | ISlotControlDefinition;
  };
  type: string;
  wrapper?: boolean;
}
