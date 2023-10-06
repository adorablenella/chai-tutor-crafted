"use client";

import React, { useEffect, useState } from "react";
import { Image, Link, List, SingleLineText, Styles } from "@/sdk/package/controls";
import BlurImage from "@/components/blur-image";
import { registerClientBlock } from "@/sdk/next/client";

const Navbar = ({ blockProps, menuItems = [], logo, signInStyles }: any) => {
  const [state, setState] = useState(false);
  console.log("menuItems", signInStyles);

  // Replace javascript:void(0) paths with your paths
  const navigation = menuItems;
  useEffect(() => {
    // @ts-ignore
    document.onclick = (e) => {
      const { target } = e as any;
      if (target.closest && !target.closest(".menu-btn")) setState(false);
    };
  }, []);

  return (
    <nav
      {...blockProps}
      className={`bg-white md:text-sm ${
        state ? "mx-2 mt-2 rounded-xl border shadow-lg md:mx-2 md:mt-0 md:border-none md:shadow-none" : ""
      }`}>
      <div className="mx-auto max-w-screen-xl items-center gap-x-14 px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-5 md:block">
          <a href="#/">
            <BlurImage width="100" height="40" className="h-6 w-auto" src={logo} alt="Float UI logo" />
          </a>
          <div className="md:hidden">
            {/* eslint-disable-next-line react/button-has-type */}
            <button className="menu-btn text-gray-500 hover:text-gray-800" onClick={() => setState(!state)}>
              {state ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className={`mt-8 flex-1 items-center md:mt-0 md:flex ${state ? "block" : "hidden"} `}>
          <ul className="items-center justify-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {React.Children.toArray(
              navigation.map((item: any) => (
                <li className="text-gray-700 hover:text-gray-900">
                  <a href={item.link.href} className="block">
                    {item.title}
                  </a>
                </li>
              )),
            )}
          </ul>
          <div className="mt-6 flex-1 items-center justify-end gap-x-6 space-y-6 md:mt-0 md:flex md:space-y-0">
            <a href="#/" className="block text-gray-700 hover:text-gray-900">
              Log in
            </a>
            <div {...signInStyles}>
              Sign in
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

registerClientBlock(Navbar, {
  type: "Navbar",
  label: "Navbar",
  group: "custom",
  props: {
    logo: Image({ default: "https://floatui.com/logo.svg", title: "Logo" }),
    menuItems: List({
      default: [
        { title: "Home", link: { href: "#/" } },
        { title: "About", link: { href: "#/" } },
      ],
      title: "Menu Items",
      itemProperties: {
        title: SingleLineText({ default: "Menu Item", title: "Menu Item" }),
        link: Link({ default: { target: "_self", href: "#", type: "url" }, title: "Link" }),
      },
    }),
    loginLink: Link({ default: { target: "_self", href: "/login", type: "url" }, title: "Login Link" }),
    signUpLink: Link({ default: { target: "_self", href: "/register", type: "url" }, title: "Register Link" }),
    signInStyles: Styles({
      default:
        "bg-primary-800 hover:bg-primary-700 active:bg-primary-900 flex items-center justify-center gap-x-1 rounded-full px-4 py-2 font-medium text-white md:inline-flex",
    }),
  },
});
