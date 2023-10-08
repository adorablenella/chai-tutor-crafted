import { registerServerBlock } from "@/sdk/next/server";
import { Slot } from "@/sdk/package/controls/controls";

const Hero1 = ({ content, blockProps }: any) => {
  return (
    <div
      {...blockProps}
      className="relative overflow-hidden before:absolute before:left-1/2 before:top-0 before:-z-[1] before:h-full before:w-full before:-translate-x-1/2 before:transform  before:bg-cover before:bg-top before:bg-no-repeat">
      <div className="mx-auto max-w-[85rem] px-4 pb-10 pt-24 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <a
            className="inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white p-1 pl-3 text-sm text-gray-800 transition hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-600"
            href="#">
            PRO release - Join to waitlist
            <span className="inline-flex items-center justify-center gap-x-2 rounded-full bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-400">
              <svg className="h-2.5 w-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </a>
        </div>
        <div>{content}</div>

        <div className="mt-8 grid w-full gap-3 sm:inline-flex sm:justify-center">
          <a
            className="inline-flex items-center justify-center gap-x-3 rounded-md border border-transparent bg-gradient-to-tl from-blue-600 to-violet-600 px-4 py-3 text-center text-sm font-medium text-white hover:from-violet-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
            href="#">
            Get started
            <svg className="h-3 w-3" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </a>
          <a
            className="group relative inline-flex items-center justify-center gap-x-3.5 rounded-md border bg-white p-2 pl-4 text-center font-mono text-sm font-medium shadow-sm transition hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-800 dark:bg-slate-900 dark:text-white dark:shadow-slate-700/[.7] dark:hover:border-gray-600 dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
            href="javascript:;">
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
          </a>
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
          <a
            className="inline-flex items-center gap-x-1.5 text-sm font-medium text-blue-600 decoration-2 hover:underline"
            href="#">
            Installation Guide
            <svg className="h-2.5 w-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

registerServerBlock(Hero1, {
  type: "Hero1",
  label: "Hero 1",
  group: "Hero",
  props: {
    content: Slot({ name: "Hero Content", emptyStyles: "h-20" }),
  },
});
