import React from "react";
import { TBlock } from "@/sdk/package/types/TBlock";
import { ICustomBlockOptions } from "@/sdk/package/controls/types";
import { mapValues, set } from "lodash";
import { SERVER_BLOCKS } from "@/sdk/next/SERVER_BLOCKS";
import { registerBlock } from "@/sdk/package/controls";

export const registerServerBlock = (component: React.FC<TBlock & any>, options: ICustomBlockOptions) => {
  set(SERVER_BLOCKS, options.type, { component, defaults: mapValues(options.props || {}, "default") });
  registerBlock(component, options);
};
