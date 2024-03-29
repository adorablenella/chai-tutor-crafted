import { TProjectData } from "@/sdk/next/types";
import { get, isEmpty, merge, replace, startsWith } from "lodash";
import { BRANDING_OPTIONS_DEFAULTS } from "@/sdk/package/constants/MODIFIERS";
import { getBrandingClasses, getTailwindCSS } from "@/sdk/next/functions";
import supabase from "@/app/helpers/supabase";
import { revalidateTag } from "next/cache";
import { STYLES_KEY } from "@/sdk/package/constants/CONTROLS";
import { addPrefixToClasses } from "@/sdk/next/functions/addPrefixToClasses";

export const publishPath = async (slug: string, domain: string) => {
  revalidateTag(`${domain}`);
  return true;
};

const getSeoData = (pageData: any, projectData: TProjectData) => {
  const seoData = merge(projectData.seo_data, pageData.seo_data);
  return {
    title: get(seoData, "title", ""),
    description: get(seoData, "description", ""),
    image: get(seoData, "image", null),
  };
};

export const getRouteSnapshot = async (domain: string, _slug: string) => {
  const slug = _slug === "" ? "" : _slug;
  const { data: project } = await supabase.from("projects").select(`*`).eq("subdomain", domain).single();

  if (!project) {
    return { notFound: true };
  }

  // homepage
  const key = isEmpty(slug) ? "uuid" : "slug";
  const value = isEmpty(slug) ? project.homepage : slug;
  const { data: page, error } = await supabase
    .from("pages")
    .select(`*, projects!pages_project_fkey(*)`)
    .eq(key, value)
    .eq("project", project.uuid)
    .single();

  if (!page || error) {
    return { notFound: true };
  }

  let blocks = page?.blocks || [];
  const projectData: TProjectData = get(page, "projects", {});
  const brandingClasses = getBrandingClasses(projectData.branding_options);

  blocks = blocks.map((block: any) => {
    // loop through all block keys and check if it starts with #styles:
    // if it does, then replace "#styles:" with the empty string
    Object.keys(block).forEach((key) => {
      if (startsWith(block[key], STYLES_KEY)) {
        block[key] = addPrefixToClasses(block[key], "c-");
      }
    });
    return block;
  });

  const styles = await getTailwindCSS(
    projectData.branding_options,
    [replace(JSON.stringify(blocks), /#styles:/g, "")],
    brandingClasses.split(" ").concat("c-inline-block", "c-w-full", "c-h-full"),
  );

  return {
    pageData: {
      page_name: page.page_name,
      translations: { en: {} },
      blocks: blocks,
      slug,
      custom_code: page.custom_code || "",
      seo_data: getSeoData(page, projectData),
    },
    projectData: {
      translations: { en: {} },
      branding_options: merge(BRANDING_OPTIONS_DEFAULTS, get(projectData, "branding_options", {})),
      primary_language: projectData?.primary_language || "en",
      custom_code: projectData?.custom_code || "",
      favicon: projectData?.favicon || "",
      password: projectData?.password || "",
      languages: get(projectData, "languages", ["en"]),
    },
    globalBlocks: [],
    styles,
  };
};
