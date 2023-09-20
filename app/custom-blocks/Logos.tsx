"use client";

// nolint
import {
  GlobalDataMapper,
  Image,
  List,
  registerBlock,
  SingleLineText,
  Styles,
} from "../app/(dashboard)/editor/package";

type TStylesProps = {
  className: string;
  "data-styles-prop": string;
};

// type TBlockProps = {
//   "data-block-id": string;
// };

type LogosProps = {
  logoStyles: TStylesProps;
  logos: { alt: string; url: string }[];
  title: string;
  titleStyles: TStylesProps;
};

export default function LogosBLock({ title, logos, titleStyles, logoStyles }: LogosProps) {
  return (
    <div className="py-14">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <h3 {...titleStyles}>{title}</h3>
        <div className="mt-6">
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">
            {logos.map((logo) => (
              <li>
                <img {...logoStyles} src={logo.url} alt={logo.alt} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

registerBlock(LogosBLock, {
  type: "Logos Block",
  label: "Logos block",
  group: "logos",
  props: {
    titleStyles: Styles({ default: "font-semibold text-sm text-gray-600 text-center" }),
    logoStyles: Styles({ default: "font-semibold text-sm text-gray-600 text-center" }),
    title: GlobalDataMapper({ title: "Title", dataType: "string", default: "" }),
    logos: List({
      title: "Logos",
      itemProperties: {
        url: Image({ title: "Image" }),
        alt: SingleLineText({ title: "Alt" }),
      },
    }),
  },
});
