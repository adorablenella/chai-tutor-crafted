// nolint
import React from "react";
import { Icon, List, Model, MultilineText, SingleLineText, Styles } from "@/sdk/package/controls";
import { registerServerBlock } from "@/sdk/next/server";

type TStylesProps = {
  className: string;
  "data-styles-prop": string;
};

type TBlockProps = {
  "data-block-id": string;
};

type FeaturesProps = {
  badge: string;
  blockProps: TBlockProps;
  featTitleStyles: TStylesProps;
  features: { comment: string; name: string }[];
  heading: string;
  mainStyles: TStylesProps;
  styles: TStylesProps;
  subHeading: string;
};

export default function FeaturesBlock({
  features = [],
  blockProps,
  styles,
  featTitleStyles,
  mainStyles,
  badge,
  heading,
  subHeading,
}: FeaturesProps) {
  return (
    <div {...mainStyles} {...blockProps}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">{badge}</h2>
          {/* eslint-disable-next-line react/no-danger */}
          <h2 {...styles} dangerouslySetInnerHTML={{ __html: heading }} />
          {/* eslint-disable-next-line react/no-danger */}
          <p className="mt-6 text-lg leading-8" dangerouslySetInnerHTML={{ __html: subHeading }} />
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          {features.length === 0 && (
            <div className="border border-dashed p-10">
              <p className="text-lg leading-8 ">Add some features</p>
            </div>
          )}
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {React.Children.toArray(
              features.map((feature: any) => (
                <div className="relative pl-16">
                  <dt {...featTitleStyles}>
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      {/* eslint-disable-next-line react/no-danger */}
                      <span dangerouslySetInnerHTML={{ __html: feature.icon }} />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7">{feature.description}</dd>
                </div>
              )),
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}

registerServerBlock(FeaturesBlock, {
  type: "Features Block",
  label: "Features block",
  group: "features",
  props: {
    badge: SingleLineText({ title: "Badge", default: "" }),
    heading: MultilineText({ title: "Heading", default: "This is my heading" }),
    subHeading: MultilineText({
      title: "Sub Heading",
      default: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      multiLingual: true,
    }),
    group: Model({
      title: "Heading Section",
      properties: {
        name: SingleLineText({ title: "Name", default: "Hello World" }),
        icon: Icon({ title: "SVG Icon", default: "" }),
      },
    }),
    mainStyles: Styles({ default: "py-24 sm:py-32" }),
    styles: Styles({ default: "mt-2 text-3xl font-bold tracking-tight sm:text-4xl" }),
    featTitleStyles: Styles({ default: "text-base font-semibold leading-7 text-gray-900" }),
    features: List({
      title: "Features",
      itemProperties: {
        name: SingleLineText({ title: "Name", default: "Feature" }),
        description: MultilineText({ title: "Description", default: "Lorem ipsum " }),
        icon: Icon({ title: "Icon", default: "" }),
      },
    }),
  },
});
