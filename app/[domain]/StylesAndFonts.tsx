"use client";

import { get } from "lodash";

const GOOGLE_FONT = (font: string) =>
  `https://fonts.googleapis.com/css2?family=${font}:wght@300;400;500;600;700;800;900&display=swap`;

export const StylesAndFonts = ({ snapshot }: any) => {
  const isDifferentFont =
    get(snapshot.projectData.branding_options, "_headingFont", "") !==
    get(snapshot.projectData.branding_options, "_bodyFont", "");

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={""} />
      <link rel="stylesheet" href={GOOGLE_FONT(get(snapshot.projectData.branding_options, "_headingFont", ""))} />
      {isDifferentFont ? (
        <link rel="stylesheet" href={GOOGLE_FONT(get(snapshot.projectData.branding_options, "_bodyFont", ""))} />
      ) : null}
      <style id={"block-styles"}>{snapshot.styles}</style>
    </>
  );
};
