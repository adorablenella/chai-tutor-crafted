import { filter, get, isEmpty } from "lodash";
import { BlocksRendererLive } from "./LiveRenderer";
import { getBrandingClasses } from "@/sdk/next/functions";
import { Provider } from "react-wrap-balancer";
import { TBlock } from "@/sdk/package/types/TBlock";
import { fetchRouteSnapshot } from "@/sdk/next/api-handlers/fetchRouteSnapshot";
import { StylesAndFonts } from "@/app/[domain]/StylesAndFonts";

const NextBlocksRenderer = async ({
  model = "page",
  slug,
  domain,
}: {
  model: "section" | "page";
  slug: string;
  domain: string;
}) => {
  const snapshot = await fetchRouteSnapshot(domain, slug);
  if (model === "section") {
    return <div>Generate the section page</div>;
  }

  const brandingOptions = get(snapshot, "projectData.branding_options", {});

  return (
    <>
      <StylesAndFonts snapshot={snapshot} />
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
