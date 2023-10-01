import React from "react";
import { ICustomBlockOptions } from "./types";
import { TBlock } from "../types/TBlock";
import { BUILDER_BLOCKS } from "../blocks/builder-blocks";
import { set } from "lodash";

export const registerInternalBlock = (component: React.FC<TBlock & any>, options: ICustomBlockOptions) => {
  const Wrapper = options.wrapper
    ? (props: any) => (
        <div className="relative">
          {React.createElement(component, props)}
          <div id={props._id} className="absolute inset-0 z-10" />
        </div>
      )
    : component;
  set(BUILDER_BLOCKS, options.type, { component: Wrapper, ...options });
};

/**
 * Public API for registering a custom block
 * @param component
 * @param options
 */
export const registerBlock = (
  component: React.FC<TBlock & Record<string, any>>,
  options: Omit<ICustomBlockOptions, "category">,
) => {
  console.log("registerBlock", options);
  registerInternalBlock(component, { ...options, ...{ category: "custom" } });
};
