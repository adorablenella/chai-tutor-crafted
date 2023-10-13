import { registerServerBlock } from "@/sdk/next/server";
import React from "react";
import {
  Checkbox,
  Icon,
  Image,
  Link as LinkControl,
  List,
  Model,
  SingleLineText,
  Styles,
} from "@/sdk/package/controls/controls";
import BlurImage from "@/components/blur-image";
import Link from "next/link";
import { DarkModeSwitch } from "@/custom-blocks/preline/client-components/DarkModeSwitch";

const Navbar1 = ({
  blockProps,
  logo,
  name,
  menuItems,
  rightButton1,
  rightButton2,
  darkModeSwitch,
  rightButton2Styles,
}: any) => {
  return (
    <header
      {...blockProps}
      className="z-50 flex w-full flex-wrap border-b border-gray-200 bg-white py-3 text-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-nowrap sm:justify-start sm:py-0">
      <nav
        className="relative mx-auto w-full max-w-7xl px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
        aria-label="Global">
        <div className="flex items-center justify-between">
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
          className="hs-collapse hidden grow basis-full transition-all duration-300 sm:block">
          <div className="mt-5 flex flex-col gap-x-0 gap-y-4 sm:mt-0 sm:flex-row sm:items-center sm:gap-x-7 sm:gap-y-0 sm:pl-7">
            {menuItems?.map((menuItem: any, index: number) => (
              <Link
                key={menuItem.label + index}
                className="font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 sm:py-6"
                href={menuItem.link.href}>
                {menuItem.label}
              </Link>
            ))}

            <div className="flex items-center gap-x-4 sm:ml-auto">
              <Link
                className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                href={rightButton1.link.href}>
                <span dangerouslySetInnerHTML={{ __html: rightButton1.icon }}></span>
                {rightButton1.label}
              </Link>
              {rightButton2.label ? (
                <Link {...rightButton2Styles} href={rightButton2.link.href}>
                  <span dangerouslySetInnerHTML={{ __html: rightButton2.icon }}></span>
                  {rightButton2.label}
                </Link>
              ) : null}
              {darkModeSwitch ? <DarkModeSwitch /> : null}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

registerServerBlock(Navbar1, {
  type: "Navbar1",
  label: "Navbar Simple",
  group: "Navbar",
  props: {
    logo: Image({
      default:
        "https://fldwljgzcktqnysdkxnn.supabase.co/storage/v1/object/public/chaibuilder-blob-storage/chai-builder-logo.png",
      title: "Logo",
    }),
    name: SingleLineText({ title: "Name", default: "Chai Builder" }),
    darkModeSwitch: Checkbox({ title: "Show Dark Mode Switch?", default: true }),
    rightButton1: Model({
      title: "Right Button 1",
      default: {
        icon: "",
        label: "Button 1",
        link: { href: "/", type: "page", target: "_self" },
      },
      properties: {
        icon: Icon({ title: "Icon", default: "" }),
        label: SingleLineText({ title: "Label", default: "Label" }),
        link: LinkControl({ title: "Link", default: { href: "/", type: "page", target: "_self" } }),
      },
    }),
    rightButton2: Model({
      title: "Right Button 2",
      default: {
        icon: "",
        label: "Button 2",
        link: { href: "/", type: "page", target: "_self" },
      },
      properties: {
        icon: Icon({ title: "Icon", default: "" }),
        label: SingleLineText({ title: "Label", default: "Label" }),
        link: LinkControl({ title: "Link", default: { href: "/", type: "page", target: "_self" } }),
      },
    }),
    menuItems: List({
      title: "Menu Items",
      default: [
        {
          label: "About",
          link: { href: "/", type: "page", target: "_self" },
        },
      ],
      itemProperties: {
        label: SingleLineText({ title: "Label", default: "Label" }),
        link: LinkControl({ title: "Link", default: { href: "/", type: "page", target: "_self" } }),
      },
    }),
    // styles
    rightButton2Styles: Styles({
      default:
        "flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500",
    }),
  },
});
