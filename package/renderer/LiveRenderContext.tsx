import React from "react";

type LiveRenderContextValue = any;

export const LiveRenderContext = React.createContext<LiveRenderContextValue>({
  pageData: {
    blocks: [],
  },
  globalBlocks: [],
  globalData: {},
  brandingOptions: {},
  language: "en-US",
});
