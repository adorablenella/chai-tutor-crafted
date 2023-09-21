import { TPageData } from "@/sdk/package/types";
import { TProjectData } from "@/sdk/next/types";
import { get, isEmpty, merge } from "lodash";
import { BRANDING_OPTIONS_DEFAULTS } from "@/sdk/package/constants/MODIFIERS";
import { getTailwindCSS } from "@/sdk/next/functions";
import supabase from "@/app/helpers/supabase";
import { revalidateTag } from "next/cache";

export const publishPath = async (_slug: string, domain: string) => {
  const slug = _slug === "_home" ? "" : _slug;
  revalidateTag(domain);
  return true;
};

const getSeoData = (pageData: TPageData, projectData: TProjectData) => {
  const seoData = merge(projectData.seo_data, pageData.seo_data);
  return {
    title: get(seoData, "title", ""),
    description: get(seoData, "description", ""),
    image: get(seoData, "image", null),
  };
};

export const getRouteSnapshot = async (_slug: string, domain: string) => {
  const slug = _slug === "_home" ? "" : _slug;
  const { data: project } = await supabase.from("projects").select(`*`).eq("subdomain", domain).single();

  if (!project) {
    return { notFound: true };
  }

  // homepage
  const key = isEmpty(slug) ? "uuid" : "slug";
  const value = isEmpty(slug) ? project.homepage : slug;
  const { data: page } = await supabase
    .from("pages")
    .select(`*, projects!pages_project_fkey(*)`)
    .eq(key, value)
    .eq("project", project.uuid)
    .single();

  if (!page) {
    return { notFound: true };
  }

  // TODO:
  // fetch global blocks here once and pass as params

  const blocks = page?.blocks || [];
  const projectData: TProjectData = get(page, "projects", {});
  const styles = await getTailwindCSS(BRANDING_OPTIONS_DEFAULTS, [JSON.stringify(blocks)]);

  return {
    pageData: {
      page_name: page.page_name,
      translations: { en: {} },
      blocks: page.blocks || [],
      slug,
      custom_code: page.custom_code || "",
      seo_data: getSeoData(page, projectData),
    },
    projectData: {
      translations: { en: {} },
      branding_options: merge(get(projectData, "branding_options", {}), BRANDING_OPTIONS_DEFAULTS),
      primary_language: projectData?.primary_language || "en",
      custom_code: projectData?.custom_code || "",
      favicon: projectData?.favicon || "",
      webclip: get(projectData, "webclip", ""),
      password: projectData?.password || "",
      languages: get(projectData, "languages", ["en"]),
    },
    globalBlocks: [],
    styles,
  };
};
