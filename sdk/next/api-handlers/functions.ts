import { TProjectData } from "@/sdk/next/types";
import { get, isEmpty, merge } from "lodash";
import { BRANDING_OPTIONS_DEFAULTS } from "@/sdk/package/constants/MODIFIERS";
import { getBrandingClasses, getTailwindCSS } from "@/sdk/next/functions";
import supabase from "@/app/helpers/supabase";
import { revalidateTag } from "next/cache";

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

export const getRouteSnapshot = async (_slug: string, domain: string) => {
  const slug = _slug === "_home" ? "" : _slug;
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

  // TODO:
  // fetch global blocks here once and pass as params

  const blocks = page?.blocks || [];
  const projectData: TProjectData = get(page, "projects", {});
  const brandingClasses = getBrandingClasses(projectData.branding_options);
  const styles = await getTailwindCSS(
    projectData.branding_options,
    [JSON.stringify(blocks)],
    brandingClasses.split(" "),
  );

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
