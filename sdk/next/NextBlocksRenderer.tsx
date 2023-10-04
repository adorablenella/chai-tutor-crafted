import { filter, get, isEmpty } from "lodash";
import { BlocksRendererLive } from "./LiveRenderer";
import { getBrandingClasses } from "@/sdk/next/functions";
import { Provider } from "react-wrap-balancer";
import { TBlock } from "@/sdk/package/types/TBlock";
import { fetchRouteSnapshot } from "@/sdk/next/api-handlers/fetchRouteSnapshot";

const GOOGLE_FONT = (font: string) =>
  `https://fonts.googleapis.com/css2?family=${font}:wght@300;400;500;600;700;800;900&display=swap`;

const NextBlocksRenderer = async ({
  model = "page",
  slug,
  domain,
}: {
  model: "section" | "page";
  slug: string;
  domain: string;
}) => {
  const snapshot = await fetchRouteSnapshot(slug, domain);
  if (model === "section") {
    return <div>Generate the section page</div>;
  }

  const brandingOptions = get(snapshot, "projectData.branding_options", {});

  return (
    <>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={""} />
        <link rel="stylesheet" href={GOOGLE_FONT(get(brandingOptions, "_headingFont", ""))} />
        <link rel="stylesheet" href={GOOGLE_FONT(get(brandingOptions, "_bodyFont", ""))} />
        <style id={"block-styles"}>{snapshot.styles}</style>
      </head>
      <div className={getBrandingClasses(brandingOptions)}>
        <Provider>
          <BlocksRendererLive
            snapshot={snapshot}
            blocks={filter(snapshot.pageData?.blocks, (block: TBlock) => isEmpty(block._parent))}
          />
        </Provider>
      </div>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: get(snapshot, "projectData.custom_code", "") }} />
    </>
  );
};

export default NextBlocksRenderer;
