import { filter, get, isEmpty } from "lodash";
import { BlocksRendererLive } from "../package/renderer/LiveRenderer";
import { getBrandingClasses } from "@/sdk/next/functions";
import { Provider } from "react-wrap-balancer";
import { TBlock } from "@/sdk/package/types/TBlock";
import Head from "next/head";

const LiveRender = ({ model = "page", snapshot }: { model: "section" | "page"; snapshot: any }) => {
  if (model === "section") {
    return <div>Generate the section page</div>;
  }

  return (
    <>
      <Head>
        <link rel="shortcut icon" href={get(snapshot, "projectData.favicon", "")} />
        <title>{get(snapshot, "pageData.seo_data.title", "")}</title>
        <meta property="og:title" content={get(snapshot, "pageData.seo_data.title", "")} />
        <meta name="description" content={get(snapshot, "pageData.seo_data.description", "")} />
        <meta property="og:description" content={get(snapshot, "pageData.seo_data.description", "")} />
        <meta property="image" content={get(snapshot, "pageData.seo_data.image", "")} />
        <meta property="og:image" content={get(snapshot, "pageData.seo_data.image", "")} />
        <style id={"block-styles"}>{snapshot.styles}</style>
      </Head>
      <div className={getBrandingClasses(get(snapshot, "projectData.branding_options", {}))}>
        <Provider>
          <BlocksRendererLive
            snapshot={snapshot}
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
