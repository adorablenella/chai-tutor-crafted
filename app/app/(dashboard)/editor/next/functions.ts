import { get, set } from "lodash";
import { createTailwindcss } from "@mhsdesign/jit-browser-tailwindcss";
import { tailwindcssPaletteGenerator } from "@bobthered/tailwindcss-palette-generator";
import defaultTheme from "tailwindcss/defaultTheme";
import twForms from "@tailwindcss/forms";
import twTypography from "@tailwindcss/typography";
import twAspectRatio from "@tailwindcss/aspect-ratio";
import twLineClamp from "@tailwindcss/line-clamp";
import twHeadlessUI from "@headlessui/tailwindcss";

export async function getTailwindCSS(options: any, markupString: string[]) {
  const primary = get(options, "_primary", "#000");
  const secondary = get(options, "_secondary", "#ccc");

  const headingFont = get(options, "_headingFont", "Inter");
  const bodyFont = get(options, "_bodyFont", "Inter");
  const borderRadius = get(options, "_roundedCorners", "0");
  const colors = tailwindcssPaletteGenerator({
    colors: [primary, secondary],
    names: ["primary", "secondary"],
  });
  set(colors, "primary.DEFAULT", primary);
  set(colors, "secondary.DEFAULT", secondary);
  const tailwind = createTailwindcss({
    tailwindConfig: {
      darkMode: "class",
      theme: {
        fontFamily: {
          heading: [headingFont, ...defaultTheme.fontFamily.sans],
          body: [bodyFont, ...defaultTheme.fontFamily.sans],
        },
        extend: {
          borderRadius: {
            global: `${!borderRadius ? "0" : borderRadius}px`,
          },
          colors,
        },
      },
      plugins: [twForms, twTypography, twAspectRatio, twLineClamp, twHeadlessUI],
      corePlugins: { preflight: false },
    },
  });

  const css = await tailwind.generateStylesFromContent(
    ` @tailwind base;
      @tailwind components;
      @tailwind utilities;`,
    markupString
  );

  return `${css} h1,h2,h3,h4,h5,h6{font-family: "${headingFont}",${defaultTheme.fontFamily.sans.join(", ")};}`;
}
