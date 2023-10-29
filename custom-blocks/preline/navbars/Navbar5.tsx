import BlurImage from "@/components/blur-image";
import Link from "next/link";
import React from "react";
import { Link as LinkControl, SingleLineText, List, Image } from "@/sdk/package/controls";
import { registerChaiBlock } from "@/sdk/next/server";
import { isEmpty } from "lodash";

const Navbar5 = ({ blockProps, logo, name, menuItemsLeft = [], menuItemsRight = [] }: any) => {
  return (
    <header
      {...blockProps}
      className="z-50 flex w-full flex-wrap border-b border-gray-200 bg-white py-3 text-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-nowrap sm:justify-start sm:py-0">
      <nav
        className="relative mx-auto flex w-full max-w-7xl justify-between px-4 sm:items-center sm:px-6 lg:px-8"
        aria-label="Global">
        {!isEmpty(menuItemsLeft) && (
          <div className="hidden flex-col items-center gap-x-8 gap-y-4 sm:flex sm:flex-row sm:gap-y-0">
            {menuItemsLeft?.map((menuItem: any, index: number) => (
              <Link
                key={menuItem.label + index}
                className="font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 sm:py-6"
                href={menuItem.link.href}>
                {menuItem.label}
              </Link>
            ))}
          </div>
        )}
        <div className="flex w-full flex-col items-center justify-between sm:w-max">
          <div className="flex w-full items-center justify-between">
            <Link href="/" aria-label={"brand"} className="flex w-fit items-center font-bold">
              <BlurImage width="100" height="40" className="h-6 w-auto rounded-md" src={logo} alt="Float UI logo" />
              <span className="block w-40 text-lg">&nbsp;{name}</span>
            </Link>
            <div className="sm:hidden">
              <button
                type="button"
                className="hs-collapse-toggle inline-flex items-center justify-center gap-2 rounded-md border bg-white p-2 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800"
                data-hs-collapse="#navbar-collapse-with-animation"
                aria-controls="navbar-collapse-with-animation"
                aria-label="Toggle navigation">
                <svg
                  className="hs-collapse-open:hidden h-4 w-4"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden h-4 w-4"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </div>
          </div>
          <div
            id="navbar-collapse-with-animation"
            className="hs-collapse hidden grow basis-full transition-all duration-300">
            <div className="mt-5 flex flex-col justify-between gap-x-0 gap-y-4 sm:mt-0 sm:flex-row sm:items-center sm:gap-x-7 sm:gap-y-0 sm:pl-7">
              {menuItemsLeft?.map((menuItem: any, index: number) => (
                <Link
                  key={menuItem.label + index}
                  className="font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 sm:py-6"
                  href={menuItem.link.href}>
                  {menuItem.label}
                </Link>
              ))}
              {menuItemsRight?.map((menuItem: any, index: number) => (
                <Link
                  key={menuItem.label + index}
                  className="font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 sm:py-6"
                  href={menuItem.link.href}>
                  {menuItem.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {!isEmpty(menuItemsRight) && (
          <div className="hidden flex-col items-center gap-x-8 gap-y-4 sm:flex sm:flex-row sm:gap-y-0">
            {menuItemsRight?.map((menuItem: any, index: number) => (
              <Link
                key={menuItem.label + index}
                className="font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 sm:py-6"
                href={menuItem.link.href}>
                {menuItem.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

registerChaiBlock(Navbar5, {
  type: "Navbar5",
  label: "Navbar center logo",
  group: "Navbar",
  preview:
    "https://ik.imagekit.io/n0uvizrukm2/BLOCKS/Screenshot%202023-10-28%20at%209.35.12%E2%80%AFPM_H8GbL5kbz.png?updatedAt=1698509128888",
  props: {
    logo: Image({
      default:
        "https://fldwljgzcktqnysdkxnn.supabase.co/storage/v1/object/public/chaibuilder-blob-storage/chai-builder-logo.png",
      title: "Logo",
    }),
    name: SingleLineText({ title: "Name", default: "Chai Builder" }),
    menuItemsLeft: List({
      title: "Left Menu Items",
      default: [
        {
          label: "Left Label 1",
          link: { href: "/", type: "page", target: "_self" },
        },
      ],
      itemProperties: {
        label: SingleLineText({ title: "Label", default: "Label" }),
        link: LinkControl({ title: "Link", default: { href: "/", type: "page", target: "_self" } }),
      },
    }),
    menuItemsRight: List({
      title: "Right Menu Items",
      default: [
        {
          label: "Right Label 1",
          link: { href: "/", type: "page", target: "_self" },
        },
      ],
      itemProperties: {
        label: SingleLineText({ title: "Label", default: "Label" }),
        link: LinkControl({ title: "Link", default: { href: "/", type: "page", target: "_self" } }),
      },
    }),
  },
});
