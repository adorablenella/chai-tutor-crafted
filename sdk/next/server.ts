import React from "react";
import { TBlock } from "@/sdk/package/types/TBlock";
import { ICustomBlockOptions } from "@/sdk/package/controls/types";
import { set } from "lodash";
import { SERVER_BLOCKS } from "@/sdk/next/SERVER_BLOCKS";
import { registerBlock } from "@/sdk/package/controls";

export const registerServerBlock = (
  component: React.FC<TBlock & any>,
  options: Omit<ICustomBlockOptions, "category">,
) => {
  set(SERVER_BLOCKS, options.type, component);
  registerBlock(component, options);
};
