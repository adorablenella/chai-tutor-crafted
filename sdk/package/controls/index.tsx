import React from "react";
import { ICustomBlockOptions } from "./types";
import { builderBlocksAtom, builderStore } from "../store";
import { TBlock } from "../types/TBlock";

/**
 * Public API for registering a custom block
 * @param component
 * @param options
 */
export const registerBlock = (component: React.FC<TBlock & any>, options: Omit<ICustomBlockOptions, "category">) => {
  registerInternalBlock(component, { ...options, ...{ category: "custom" } });
};

export const registerInternalBlock = (component: React.FC<TBlock & any>, options: ICustomBlockOptions) => {
  const Wrapper = options.wrapper
    ? (props: any) => (
        <div className="relative">
          {React.createElement(component, props)}
          <div id={props._id} className="absolute inset-0 z-10" />
        </div>
      )
    : component;

  const blocks = builderStore.get(builderBlocksAtom);
  blocks[options.type] = { component: Wrapper, ...options };
  builderStore.set(builderBlocksAtom, blocks);
};
