"use client";
import { useMemo } from "react";
import { filter, get, isEmpty } from "lodash";
import { Provider as JotaiProvider } from "jotai";
import { RenderBlocksProps } from "../package/components/canvas/framework/types";
import { LiveRenderContext } from "../package/renderer/LiveRenderContext";
import { BlocksRendererLive } from "../package/renderer/LiveRenderer";
import { TBlock } from "../package";
import { getBrandingClasses } from "@/sdk/next/functions";
import { Provider } from "react-wrap-balancer";

const LiveRender = ({ snapshot, model }: RenderBlocksProps<any>) => {
  const value = useMemo(() => ({ ...snapshot }), [snapshot]);

  if (model === "section") {
    return <div>Generate the section page</div>;
  }
  return (
    <JotaiProvider>
      <LiveRenderContext.Provider value={value as any}>
        <head>
          <title>{get(snapshot, "pageData.seo_data.title", "")}</title>
          <meta property="og:title" content={get(snapshot, "pageData.seo_data.title", "")} />
          <meta name="description" content={get(snapshot, "pageData.seo_data.description", "")} />
          <meta property="og:description" content={get(snapshot, "pageData.seo_data.description", "")} />
          <meta property="image" content={get(snapshot, "pageData.seo_data.image", "")} />
          <meta property="og:image" content={get(snapshot, "pageData.seo_data.image", "")} />
          <link rel="shortcut icon" href={get(snapshot, "projectData.favicon", "")} />
          <style>{snapshot.styles}</style>
        </head>
        <div className={getBrandingClasses(get(snapshot, "projectData.branding_options", {}))}>
          <Provider>
            <BlocksRendererLive blocks={filter(snapshot.pageData.blocks, (block: TBlock) => isEmpty(block._parent))} />
          </Provider>
        </div>
        {/* TODO: PAGE CUSTOM CODE */}
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: get(snapshot, "projectData.custom_code", "") }} />
      </LiveRenderContext.Provider>
    </JotaiProvider>
  );
};

export default LiveRender;
