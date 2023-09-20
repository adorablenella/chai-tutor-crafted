import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { BRANDING_OPTIONS_DEFAULTS } from "../constants/MODIFIERS";

type TBrandingOptions = {
  _bodyBgDarkColor: string;
  _bodyBgLightColor: string;
  _bodyFont: string;
  _bodyTextDarkColor: string;
  _bodyTextLightColor: string;
  _headingFont: string;
  _primaryColor: string;
  _roundedCorners: number;
  _secondaryColor: string;
} & Record<string, string>;

export const brandingOptionsAtom: any = atomWithStorage<TBrandingOptions>(
  "branding_options",
  BRANDING_OPTIONS_DEFAULTS as TBrandingOptions
);

/**
 * Wrapper around useAtom
 */
export const useBrandingOptions = () => useAtom(brandingOptionsAtom);
