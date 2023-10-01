import { filter, get, isEmpty } from "lodash";
import { RenderBlocksProps } from "../package/components/canvas/framework/types";
import { BlocksRendererLive } from "../package/renderer/LiveRenderer";
import { getBrandingClasses } from "@/sdk/next/functions";
import { Provider } from "react-wrap-balancer";
import { TBlock } from "@/sdk/package/types/TBlock";
import { fetchRouteSnapshot } from "@/sdk/next/api-handlers/fetchRouteSnapshot";

const LiveRender = async ({ model, slug, domain }: RenderBlocksProps<any> & { slug: string; domain: string }) => {
  const snapshot: any = await fetchRouteSnapshot(slug, domain);

  if (model === "section") {
    return <div>Generate the section page</div>;
  }

  return (
    <>
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
          <BlocksRendererLive
            slug={slug}
            domain={domain}
            blocks={filter(snapshot.pageData.blocks, (block: TBlock) => isEmpty(block._parent))}
          />
        </Provider>
      </div>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: get(snapshot, "projectData.custom_code", "") }} />
    </>
  );
};

export default LiveRender;
