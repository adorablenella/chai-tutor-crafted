"use client";

// nolint
import Link from "next/link";
import { List, Model, MultilineText, registerBlock, SingleLineText, Slot, Styles } from "../../sdk/package";

type HeroBlockProps = {
  badgeIcon: string;
  blockProps: any;
  btnStyles: Record<string, string>;
  styles: Record<string, string>;
};

export default function Hero1Block({ badgeIcon, styles, blockProps, btnStyles }: HeroBlockProps) {
  return (
    <div
      {...blockProps}
      className="relative overflow-hidden before:absolute before:left-1/2 before:top-0 before:-z-[1] before:h-full before:w-full before:-translate-x-1/2 before:transform before:bg-cover before:bg-top before:bg-no-repeat">
      <div className="mx-auto max-w-[85rem] px-4 pb-10 pt-24 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <Link
            className="inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white p-1 pl-3 text-sm text-gray-800 transition hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-600"
            href="/">
            PRO release - Join to waitlist
            <span
              dangerouslySetInnerHTML={{ __html: badgeIcon }}
              className="inline-flex items-center justify-center gap-x-2 rounded-full bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-400"
            />
          </Link>
        </div>
        <div className="mx-auto mt-5 max-w-2xl text-center">
          <h1 className="block text-4xl font-bold text-gray-800 dark:text-gray-200 md:text-5xl lg:text-6xl">
            Lets Build
            <span className="bg-gradient-to-tl from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Together
            </span>
          </h1>
        </div>

        <div className="mx-auto mt-5 max-w-3xl text-center">
          <p {...styles}>
            Preline UI is an open-source set of prebuilt UI components, ready-to-use examples and Figma design system
            based on the utility-first Tailwind CSS framework.
          </p>
        </div>

        <div className="mt-8 grid w-full gap-3 sm:inline-flex sm:justify-center">
          <Link {...btnStyles} href="#/">
            Get started
            <svg className="h-3 w-3" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </Link>
          <Link
            className="group relative inline-flex items-center justify-center gap-x-3.5 rounded-md border bg-white p-2 pl-4 text-center font-mono text-sm font-medium shadow-sm transition hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-800 dark:bg-slate-900 dark:text-white dark:shadow-slate-700/[.7] dark:hover:border-gray-600 dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
            href="/">
            $ npm i preline
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <svg
                className="h-3.5 w-3.5 transition group-hover:rotate-6"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16">
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
              </svg>
            </span>
          </Link>
        </div>

        <div className="mt-5 flex items-center justify-center gap-x-1 sm:gap-x-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">Package Manager:</span>
          <span className="text-sm font-bold text-gray-900 dark:text-white">npm</span>
          <svg
            className="h-5 w-5 text-gray-300 dark:text-gray-600"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true">
            <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round" />
          </svg>
          <Link
            className="inline-flex items-center gap-x-1.5 text-sm font-medium text-blue-600 decoration-2 hover:underline"
            href="/">
            Installation Guide
            <svg className="h-2.5 w-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

registerBlock(Hero1Block, {
  type: "Hero1",
  label: "Hero",
  group: "hero",
  props: {
    styles: Styles({ default: "text-lg text-gray-600 dark:text-gray-400" }),
    btnStyles: Styles({
      default:
        "inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-4 dark:focus:ring-offset-gray-800",
    }),
    child: Slot({ name: "Children" }),
    demo: SingleLineText({ title: "Badge Icon", default: `Demo wording` }),
    title1: SingleLineText({ title: "Badge Icon", default: "TITle 1" }),
    title2: SingleLineText({ title: "Badge Icon", default: "helo" }),
    model: Model({
      title: "Model",
      properties: {
        name: SingleLineText({ title: "Name", default: "SHola" }),
        comment: MultilineText({ title: "Comment", default: "MHola" }),
      },
    }),
    users: List({
      title: "List Items",
      default: [
        { deg: "MSc", name: "New Hello" },
        { deg: "MSc", name: "Default Name in lang" },
      ],
      itemProperties: {
        name: SingleLineText({ title: "Name", default: "List A" }),
        deg: SingleLineText({ title: "Degree", default: "List B" }),
      },
    }),
  },
});
