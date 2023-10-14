"use client";

import { get } from "lodash";

export const StylesAndFonts = ({ snapshot }: any) => {
  const isDifferentFont =
    get(snapshot.projectData.branding_options, "_headingFont", "") !==
    get(snapshot.projectData.branding_options, "_bodyFont", "");

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={""} />
      <style jsx global>
        {`
          @import url("https://fonts.googleapis.com/css2?family=${get(
            snapshot.projectData.branding_options,
            "_headingFont",
            "",
          )}:wght@300;400;500;600;700;800;900&display=swap");
          ${isDifferentFont
            ? `@import url("https://fonts.googleapis.com/css2?family=${get(
                snapshot.projectData.branding_options,
                "_bodyFont",
                "",
              )}:wght@300;400;500;600;700;800;900&display=swap");`
            : ""}
          body {
          }
          .c {
            visibility: visible !important;
          }
          ${snapshot.styles}
        `}
      </style>
    </>
  );
};
