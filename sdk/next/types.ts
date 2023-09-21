/* eslint-disable typescript-sort-keys/interface */
import { TBlock } from "../package";

export type TPageSEOData = {
  _author?: string;
  _keywords?: string;
  _robots?: string;
  title: string;
  description: string;
  image: string;
} & Record<string, string>;

export type TBrandingOptions = {
  _bodyFont: string;
  _headingFont: string;
  _roundedCorners: number;
  _primaryColor: string;
  _secondaryColor: string;
  _bodyBgDarkColor: string;
  _bodyBgLightColor: string;
  _bodyTextDarkColor: string;
  _bodyTextLightColor: string;
} & Record<string, string>;

export type TPageData = {
  uuid: string;
  page_name: string;
  slug: string;
  blocks: TBlock[];
  custom_code: string;
  seo_data: TPageSEOData;
  project?: string;
  status?: string | null;
  type: "STATIC" | "DYNAMIC";
};

export type TProjectData = {
  uuid?: string;
  branding_options: TBrandingOptions;
  custom_code: string;
  favicon: string;
  languages: string[];
  password: string;
  homepage: string;
  primary_language: string;
  project_name: string;
  web_clip: string;
  seo_data: TPageSEOData;
  subdomain: string;
};

export type TUser = {
  id: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  user_metadata: any;
} | null;
