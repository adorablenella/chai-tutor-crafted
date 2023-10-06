import React from "react";
import { TBlock } from "@/sdk/package/types/TBlock";
import { ICustomBlockOptions } from "@/sdk/package/controls/types";
import { mapValues, set } from "lodash";
import { registerBlock } from "@/sdk/package/controls";
import { CLIENT_BLOCKS } from "@/sdk/next/CLIENT_BLOCKS";

export const registerClientBlock = (
  component: React.FC<TBlock & any>,
  options: Omit<ICustomBlockOptions, "category">,
) => {
  set(CLIENT_BLOCKS, options.type, { component, defaults: mapValues(options.props || {}, "default") });
  registerBlock(component, options);
};
