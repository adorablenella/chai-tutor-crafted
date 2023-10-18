import * as React from "react";

export type CoreBlock = {
  allowedChildren?: string[];
  canvasComponent: React.FC<any>;
  category: string;
  group: string;
  headlessUiStates?: string[];
  hidden?: boolean;

  icon: React.ReactNode | any;
  props: object;

  settings?: Array<{ component: React.FC<any>; props: { label: string; prop: string } | object }>;
  type: string;
};
