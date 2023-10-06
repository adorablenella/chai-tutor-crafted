import React from "react";
import { TBlock } from "@/sdk/package/types/TBlock";

export const SERVER_BLOCKS: { [type: string]: { component: React.FC<TBlock>; defaults: Record<string, any> } } = {};
