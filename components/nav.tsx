"use client";

import Link from "next/link";
import { ArrowLeft, BarChart3, Edit3, Globe, LayoutDashboard, Menu, Newspaper, Settings } from "lucide-react";
import { useParams, usePathname, useSelectedLayoutSegments } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { getSiteFromPostId } from "@/lib/actions";
import Image from "next/image";

const externalLinks: any = [];

export default function Nav({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const { id } = useParams() as { id?: string };

  const [siteId, setSiteId] = useState<string | null>();

  useEffect(() => {
    if (segments[0] === "post" && id) {
      getSiteFromPostId(id).then((id) => {
        setSiteId(id);
      });
    }
  }, [segments, id]);

  const tabs = useMemo(() => {
    if (segments[0] === "site" && id) {
      return [
        {
          name: "Back to All Sites",
          href: "/",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Edit Site",
          href: `/site/${id}/edit`,
          isActive: segments.includes("edit"),
          icon: <Globe width={18} />,
        },
        {
          name: "Blogs",
          href: `/site/${id}`,
          isActive: segments.length === 2,
          icon: <Newspaper width={18} />,
        },
        // {
        //   name: "Analytics",
        //   href: `/site/${id}/analytics`,
        //   isActive: segments.includes("analytics"),
        //   icon: <BarChart3 width={18} />,
        // },
        {
          name: "Settings",
          href: `/site/${id}/settings`,
          isActive: segments.includes("settings"),
          icon: <Settings width={18} />,
        },
      ];
    } else if (segments[0] === "post" && id) {
      return [
        {
          name: "Back to All Blogs",
          href: siteId ? `/site/${siteId}` : "/",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Editor",
          href: `/post/${id}`,
          isActive: segments.length === 2,
          icon: <Globe width={18} />,
        },
        {
          name: "Settings",
          href: `/post/${id}/settings`,
          isActive: segments.includes("settings"),
          icon: <Settings width={18} />,
        },
      ];
    }
    return [
      // {
      //   name: "Overview",
      //   href: "/",
      //   isActive: segments.length === 0,
      //   icon: <LayoutDashboard width={18} />,
      // },
      {
        name: "Sites",
        href: "/",
        isActive: segments[0] === "sites",
        icon: <Globe width={18} />,
      },
      {
        name: "Settings",
        href: "/settings",
        isActive: segments[0] === "settings",
        icon: <Settings width={18} />,
      },
    ];
  }, [segments, id, siteId]);

  return (
    <>
      <div
        className={`fixed z-10 flex h-full w-full flex-col justify-between border-r border-stone-200 bg-stone-100 p-4 transition-all dark:border-stone-700 dark:bg-stone-900 sm:w-60 sm:translate-x-0`}>
        <div className="grid gap-2">
          <div className="flex items-center space-x-2 rounded-lg py-1.5">
            <Link href="/" className="rounded-lg p-2 hover:bg-stone-200 dark:hover:bg-stone-700">
              <Image
                src="https://ik.imagekit.io/n0uvizrukm2/chai-builder-logo-b-w_s_VR37ggn.png?updatedAt=1692613727383"
                width={24}
                height={24}
                alt="Logo"
                className="dark:scale-110 dark:rounded-full dark:border dark:border-stone-400"
              />
            </Link>
            <span className="text-lg font-bold tracking-wider text-white">ChaiBuilder</span>
          </div>

          <div className="grid gap-1">
            {tabs.map(({ name, href, isActive, icon }) => (
              <Link
                key={name}
                href={href}
                className={`flex items-center space-x-3 ${
                  isActive ? "bg-stone-200 text-black dark:bg-stone-700" : ""
                } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800`}>
                {icon}
                <span className="text-sm font-medium">{name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="grid gap-1">
            {externalLinks.map(({ name, href, icon }: any) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800">
                <div className="flex items-center space-x-3">
                  {icon}
                  <span className="text-sm font-medium">{name}</span>
                </div>
                <p>↗</p>
              </a>
            ))}
          </div>
          <div className="my-2 border-t border-stone-200 dark:border-stone-700" />
          {children}
        </div>
      </div>
    </>
  );
}
