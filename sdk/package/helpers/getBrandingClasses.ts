import { get } from "lodash";

export const getBrandingClasses = (brandingOptions: any) => {
  const textLight = get(brandingOptions, "_bodyTextLightColor", "#64748b");
  const textDark = get(brandingOptions, "_bodyTextDarkColor", "#94a3b8");
  const bgLight = get(brandingOptions, "_bodyBgLightColor", "#FFFFFF");
  const bgDark = get(brandingOptions, "_bodyBgDarkColor", "#0f172a");
  // @ts-ignore
  return `font-body antialiased text-[${textLight}] bg-[${bgLight}] dark:text-[${textDark}] dark:bg-[${bgDark}]`;
};
