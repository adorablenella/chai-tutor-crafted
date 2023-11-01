import BlurImage from "@/components/blur-image";
import Link from "next/link";
import React from "react";
import { DarkModeSwitch } from "@/custom-blocks/preline/client-components/DarkModeSwitch";
import {
  Styles,
  Link as LinkControl,
  SingleLineText,
  List,
  Icon,
  Model,
  Checkbox,
  Image,
} from "@/sdk/package/controls";
import { registerChaiBlock } from "@/sdk/next/server";
import { isEmpty } from "lodash";
import ChaiBuilderLink from "@/sdk/next/blocks/helper-components/chaibuilder-link";
import { generateUUID } from "@/sdk/package/functions/functions";

const Navbar4 = ({
  blockProps,
  logo,
  name,
  menuItems,
  rightButton1,
  rightButton2,
  darkModeSwitch,

  logoStyle,
  nameStyles,
  menuItemsStyles,
  rightButton1Styles,
  rightButton2Styles,
  inBuilder = false,
}: any) => {
  const navId = generateUUID();
  return (
    <header
      {...blockProps}
      className="z-50 flex w-full flex-wrap border-b border-gray-200 bg-white py-3 text-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-nowrap sm:justify-start sm:py-0">
      <nav
        className="relative mx-auto w-full max-w-7xl px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
        aria-label="Global">
        <div className="flex items-center justify-between">
          <ChaiBuilderLink
            inBuilder={inBuilder}
            href="/"
            aria-label={"brand"}
            _style={{ className: "flex w-fit items-center" }}>
            <BlurImage width="100" height="40" {...logoStyle} src={logo} alt="Float UI logo" />
            <ChaiBuilderLink inBuilder={inBuilder} _style={nameStyles} href="/">
              &nbsp;{name}
            </ChaiBuilderLink>
          </ChaiBuilderLink>
          <div className="sm:hidden">
            <button
              type="button"
              className="hs-collapse-toggle inline-flex items-center justify-center gap-2 rounded-md border bg-white p-2 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800"
              data-hs-collapse={`#${navId}`}
              aria-controls={navId}
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
        <div id={navId} className="hs-collapse hidden grow basis-full transition-all duration-300 sm:block">
          <div className="mt-5 flex flex-col justify-between gap-x-0 gap-y-4 sm:mt-0 sm:flex-row sm:items-center sm:gap-x-7 sm:gap-y-0 sm:pl-7">
            <div />

            <div className="flex flex-col items-center gap-x-8 gap-y-4 sm:flex-row sm:gap-y-0">
              {menuItems?.map((menuItem: any, index: number) => (
                <ChaiBuilderLink
                  key={menuItem.label + index}
                  inBuilder={inBuilder}
                  _style={menuItemsStyles}
                  href={menuItem.link.href}>
                  {menuItem.label}
                </ChaiBuilderLink>
              ))}
            </div>

            <div className="flex flex-col items-center gap-x-4 gap-y-4 sm:flex-row sm:gap-y-0">
              {darkModeSwitch ? <DarkModeSwitch /> : null}
              {rightButton1.label || rightButton1.icon ? (
                <ChaiBuilderLink inBuilder={inBuilder} _style={rightButton1Styles} href={rightButton1.link.href}>
                  {!isEmpty(rightButton1.icon) && <span dangerouslySetInnerHTML={{ __html: rightButton1.icon }}></span>}
                  {rightButton1.label}
                </ChaiBuilderLink>
              ) : null}
              {rightButton2.label || rightButton2.icon ? (
                <ChaiBuilderLink inBuilder={inBuilder} _style={rightButton2Styles} href={rightButton2.link.href}>
                  {!isEmpty(rightButton2.icon) && <span dangerouslySetInnerHTML={{ __html: rightButton2.icon }}></span>}
                  {rightButton2.label}
                </ChaiBuilderLink>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

registerChaiBlock(Navbar4, {
  type: "Navbar6",
  label: "Navbar Styled Center Menu Item",
  group: "Navbar",
  preview:
    "https://ik.imagekit.io/n0uvizrukm2/BLOCKS/Screenshot%202023-10-28%20at%209.57.22%E2%80%AFPM_W9OQ-O7w-.png?updatedAt=1698510462555",
  props: {
    logo: Image({
      default:
        "https://fldwljgzcktqnysdkxnn.supabase.co/storage/v1/object/public/chaibuilder-blob-storage/chai-builder-logo.png",
      title: "Logo",
    }),
    name: SingleLineText({ title: "Name", default: "Chai Builder" }),
    darkModeSwitch: Checkbox({ title: "Show Dark Mode Switch?", default: false }),
    rightButton1: Model({
      title: "Right Button 1",
      default: {
        icon: "",
        label: "Log in",
        link: { href: "/", type: "page", target: "_self" },
      },
      properties: {
        icon: Icon({ title: "Icon", default: "" }),
        label: SingleLineText({ title: "Label", default: "Log in" }),
        link: LinkControl({ title: "Link", default: { href: "/", type: "page", target: "_self" } }),
      },
    }),
    rightButton2: Model({
      title: "Right Button 2",
      default: {
        icon: "",
        label: "Sign up",
        link: { href: "/", type: "page", target: "_self" },
      },
      properties: {
        icon: Icon({ title: "Icon", default: "" }),
        label: SingleLineText({ title: "Label", default: "Sign up" }),
        link: LinkControl({ title: "Link", default: { href: "/", type: "page", target: "_self" } }),
      },
    }),
    menuItems: List({
      title: "Menu Items",
      default: [
        {
          label: "Label",
          link: { href: "/", type: "page", target: "_self" },
        },
      ],
      itemProperties: {
        label: SingleLineText({ title: "Label", default: "Label" }),
        link: LinkControl({ title: "Link", default: { href: "/", type: "page", target: "_self" } }),
      },
    }),

    // styles
    logoStyle: Styles({
      default: "h-7 w-auto rounded-md",
    }),
    nameStyles: Styles({
      default: "block w-40 text-lg font-bold",
    }),
    menuItemsStyles: Styles({
      default: "font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 sm:py-6",
    }),
    rightButton1Styles: Styles({
      default:
        "flex cursor-pointer items-center gap-x-2 rounded bg-gray-100 px-4 py-1 font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300",
    }),
    rightButton2Styles: Styles({
      default: "flex cursor-pointer items-center gap-x-2 rounded bg-blue-600 px-4 py-1 font-medium text-white",
    }),
  },
});
