import { TGlobalBlock } from "../../../types/TBlock";

type TSEOData = {};

type TTranslations = Record<string, Record<string, string>>;

export type ChaiBuilderPageSnapshot = {
  globalBlocks: TGlobalBlock[];
  pageData: {
    blocks: [];
    custom_code: string;
    seo_data: TSEOData;
    slug: string;
    translations?: TTranslations;
  };
  projectData: {
    branding_options: Record<string, string>;
    custom_code: string;
    favicon: string;
    languages: string[];
    password: string;
    primary_language: string;
    seo_data: TSEOData;
    translations?: TTranslations;
  };
  styles: string;
};

export type TChaiBuilderSectionSnapshot = {
  globalBlocks: TGlobalBlock[];
  pageData: {
    blocks: [];
    slug: string;
    translations?: TTranslations;
  };
  projectData: {
    branding_options: Record<string, string>;
    translations?: TTranslations;
  };
  styles: string;
};

export interface RenderBlocksProps<Model extends "section" | "page"> {
  model?: Model;
}
