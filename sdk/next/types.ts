import { TBlock } from "../package/types/TBlock";

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
  customDomain: string;
  homepage: string;
  primary_language: string;
  project_name: string;
  seo_data: TPageSEOData;
  subdomain: string;
  description: string;
  type?: string;
};

export type TUser = {
  id: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  user_metadata: any;
} | null;

export type TFormSubmission = {
  uuid: string;
  created_at: string;
  form_name: string;
  form_data: Record<string, string>;
  project: string;
  page_url: string;
};
