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

const Navbar3 = ({
  blockProps,
  logo,
  name,
  menuItems,
  rightButton,
  darkModeSwitch,

  logoStyle,
  nameStyles,
  menuItemsStyles,
  rightButtonStyles,
  inBuilder = false,
}: any) => {
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
                  fill-rule="evenodd"
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
          className="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 sm:block">
          <div className="mt-5 flex flex-col gap-x-0 gap-y-4 sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:gap-x-7 sm:gap-y-0 sm:pl-7">
            {menuItems?.map((menuItem: any, index: number) => (
              <ChaiBuilderLink
                key={menuItem.label + index}
                inBuilder={inBuilder}
                _style={menuItemsStyles}
                href={menuItem.link.href}>
                {menuItem.label}
              </ChaiBuilderLink>
            ))}

            {rightButton.label || rightButton.icon ? (
              <ChaiBuilderLink inBuilder={inBuilder} _style={rightButtonStyles} href={rightButton.link.href}>
                {!isEmpty(rightButton.icon) && <span dangerouslySetInnerHTML={{ __html: rightButton.icon }}></span>}
                {rightButton.label}
              </ChaiBuilderLink>
            ) : null}

            {darkModeSwitch ? <DarkModeSwitch /> : null}
          </div>
        </div>
      </nav>
    </header>
  );
};

registerChaiBlock(Navbar3, {
  type: "Navbar3",
  label: "Navbar Flat Bordered",
  group: "Navbar",
  preview:
    "https://ik.imagekit.io/n0uvizrukm2/BLOCKS/Screenshot%202023-10-28%20at%209.32.41%E2%80%AFPM_7PWpLL-13H.png?updatedAt=1698508974599",
  props: {
    logo: Image({
      default:
        "https://fldwljgzcktqnysdkxnn.supabase.co/storage/v1/object/public/chaibuilder-blob-storage/chai-builder-logo.png",
      title: "Logo",
    }),
    name: SingleLineText({ title: "Name", default: "Chai Builder" }),
    darkModeSwitch: Checkbox({ title: "Show Dark Mode Switch?", default: true }),
    rightButton: Model({
      title: "Right Button",
      default: {
        icon: `<svg class='w-5 h-5' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.71 12.71a6 6 0 1 0-7.42 0 10 10 0 0 0-6.22 8.18 1 1 0 0 0 2 .22 8 8 0 0 1 15.9 0 1 1 0 0 0 1 .89h.11a1 1 0 0 0 .88-1.1 10 10 0 0 0-6.25-8.19ZM12 12a4 4 0 1 1 4-4 4 4 0 0 1-4 4Z"/></svg>`,
        label: "Sign In",
        link: { href: "/", type: "page", target: "_self" },
      },
      properties: {
        icon: Icon({
          title: "Icon",
          default: ``,
        }),
        label: SingleLineText({ title: "Label", default: "Label" }),
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
    rightButtonStyles: Styles({
      default:
        "flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 md:my-6 md:border-l md:border-gray-300 md:pl-6",
    }),
  },
});
