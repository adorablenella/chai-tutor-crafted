import { get, map } from "lodash";
import { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { useFrame } from "react-frame-component";
import { tailwindcssPaletteGenerator } from "@bobthered/tailwindcss-palette-generator";
import {
  canvasDarkModeAtom,
  canvasHighlightedBlockAtom,
  canvasModelAtom,
  canvasProjectSettingsAtom,
  canvasSelectedBlockIdsAtom,
  canvasSelectedStylingBlockIdsAtom,
} from "./store";
// @ts-ignore

export const HeadTags = () => {
  const [projectOptions] = useAtom(canvasProjectSettingsAtom);
  const [selectedBlockIds] = useAtom(canvasSelectedBlockIdsAtom);
  const [stylingBlockIds] = useAtom(canvasSelectedStylingBlockIdsAtom);
  const [darkMode] = useAtom(canvasDarkModeAtom);
  const [highlightedId] = useAtom(canvasHighlightedBlockAtom);
  const model = useAtomValue(canvasModelAtom);

  const { document: iframeDoc, window: iframeWin } = useFrame();

  const [highlightedBlockStyle] = useState(iframeDoc?.getElementById("highlighted-block") as HTMLStyleElement);
  const [selectedBlockStyle] = useState<HTMLStyleElement>(
    iframeDoc?.getElementById("selected-block") as HTMLStyleElement
  );
  const [selectedStylingBlocks] = useState<HTMLStyleElement>(
    iframeDoc?.getElementById("selected-styling-block") as HTMLStyleElement
  );

  useEffect(() => {
    if (darkMode) iframeDoc?.documentElement.classList.add("dark");
    else iframeDoc?.documentElement.classList.remove("dark");
  }, [darkMode, iframeDoc]);

  const headingFont: string = get(projectOptions, "headingFont", "DM Sans");
  const bodyFont: string = get(projectOptions, "bodyFont", "DM Sans");

  // FIXME: Something is wrong with this code
  useEffect(() => {
    const primary = get(projectOptions, "primary", "#000");
    const secondary = get(projectOptions, "secondary", "#FFF");
    const colors = tailwindcssPaletteGenerator({
      colors: [primary, secondary],
      names: ["primary", "secondary"],
    });
    colors.primary.DEFAULT = primary;
    colors.secondary.DEFAULT = secondary;

    const borderRadius = get(projectOptions, "roundedCorners", "0");
    // @ts-ignore
    if (!iframeWin || !iframeWin.tailwind) return;
    // @ts-ignore
    iframeWin.tailwind.config = {
      darkMode: "class",
      theme: {
        fontFamily: {
          heading: [headingFont],
          body: [bodyFont],
        },
        extend: {
          borderRadius: {
            global: `${!borderRadius ? "0" : borderRadius}px`,
          },
          colors,
        },
      },

      plugins: [
        // @ts-ignore
        iframeWin.tailwind.plugin.withOptions(({ prefix = "ui" } = {}) => ({ addVariant }: any) => {
          // eslint-disable-next-line no-restricted-syntax
          for (const state of ["open", "checked", "selected", "active", "disabled"]) {
            // But for now, this will do:
            addVariant(`${prefix}-${state}`, [
              `&[data-headlessui-state~="${state}"]`,
              `:where([data-headlessui-state~="${state}"]) &`,
            ]);

            addVariant(`${prefix}-not-${state}`, [
              `&[data-headlessui-state]:not([data-headlessui-state~="${state}"])`,
              `:where([data-headlessui-state]:not([data-headlessui-state~="${state}"])) &:not([data-headlessui-state])`,
            ]);
          }
        }),
      ],
    };
  }, [projectOptions, iframeWin, headingFont, bodyFont]);

  useEffect(() => {
    if (!selectedBlockStyle) return;
    selectedBlockStyle.textContent = `${map(selectedBlockIds, (id) => `[data-block-id="${id}"]`).join(",")}{
                outline: 1px solid ${
                  selectedBlockIds.length === 1 ? "#42a1fc" : "orange"
                } !important; outline-offset: -1px;
            }`;
  }, [selectedBlockIds, selectedBlockStyle]);

  useEffect(() => {
    if (!highlightedBlockStyle) return;
    highlightedBlockStyle.textContent = highlightedId
      ? `[data-style-id="${highlightedId}"]{ outline: 1px solid orange !important; outline-offset: -1px;}`
      : "";
  }, [highlightedId, selectedBlockIds, highlightedBlockStyle]);

  useEffect(() => {
    if (!selectedStylingBlocks) return;
    selectedStylingBlocks.textContent = `${map(stylingBlockIds, ({ _id }: any) => `[data-style-id="${_id}"]`).join(
      ","
    )}{
                outline: 1px solid orange !important; outline-offset: -1px;
            }`;
  }, [stylingBlockIds, selectedStylingBlocks]);

  // set body background color
  useEffect(() => {
    if (model === "section") return;
    const textLight = get(projectOptions, "_bodyTextLight", "#64748b");
    const textDark = get(projectOptions, "_bodyTextDark", "#94a3b8");
    const bgLight = get(projectOptions, "_bodyBgLight", "#FFFFFF");
    const bgDark = get(projectOptions, "_bodyBgDark", "#0f172a");
    // @ts-ignore
    iframeDoc.body.className = `font-body antialiased text-[${textLight}] bg-[${bgLight}] dark:text-[${textDark}] dark:bg-[${bgDark}]`;
  }, [projectOptions, iframeDoc, model]);

  return model === "page" ? (
    <>
      {headingFont && (
        <link
          id="heading-font"
          rel="stylesheet"
          type="text/css"
          href={`https://fonts.googleapis.com/css2?family=${headingFont.replace(
            / /g,
            "+"
          )}:wght@300;400;500;600;700;800;900&display=swap`}
          media="all"
        />
      )}
      {bodyFont && headingFont !== bodyFont && (
        <link
          id="body-font"
          rel="stylesheet"
          type="text/css"
          href={`https://fonts.googleapis.com/css2?family=${bodyFont.replace(
            / /g,
            "+"
          )}:wght@300;400;500;600;700;800;900&display=swap`}
          media="all"
        />
      )}
      {headingFont && (
        <style>{`h1,h2,h3,h4,h5,h6{font-family: "${headingFont}",ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";}`}</style>
      )}
    </>
  ) : null;
};
