"use client";

import Link from "next/link";
import { ArrowLeft, Globe, Settings } from "lucide-react";
import { useParams, useSelectedLayoutSegments } from "next/navigation";
import { ReactNode, useMemo } from "react";
import Image from "next/image";

export default function Nav({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const { id } = useParams() as { id?: string };

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
          href: `/editor/${id}`,
          isActive: segments.includes("edit"),
          icon: <Globe width={18} />,
          target: "_blank",
        },
        {
          name: "Settings",
          href: `/site/${id}/settings`,
          isActive: segments.includes("settings"),
          icon: <Settings width={18} />,
        },
      ];
    }
    return [
      {
        name: "Sites",
        href: "/",
        isActive: segments.length === 0,
        icon: <Globe width={18} />,
      },
      {
        name: "Apps",
        href: "/apps",
        isActive: segments[0] === "apps",
        icon: <Globe width={18} />,
      },
      {
        name: "Settings",
        href: "/settings",
        isActive: segments[0] === "settings",
        icon: <Settings width={18} />,
      },
    ];
  }, [segments, id]);

  if (segments[0] === "editor" && id) return null;

  return (
    <>
      <div
        className={`z-10 flex h-screen w-full flex-col justify-between border-r border-stone-200 bg-stone-100 p-4 transition-all dark:border-stone-700 dark:bg-stone-900 sm:w-60 sm:translate-x-0`}>
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
            {tabs.map(({ name, href, isActive, icon, target = "_self" }) => (
              <Link
                key={name}
                href={href}
                target={target}
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
          <div className="my-2 border-t border-stone-200 dark:border-stone-700" />
          {children}
        </div>
      </div>
    </>
  );
}
