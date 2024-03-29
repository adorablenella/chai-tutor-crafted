"use client";

import Link from "next/link";
import { AppWindow, ArrowLeft, Edit3, ExternalLink, FileText, Globe, Settings } from "lucide-react";
import { useParams, useSelectedLayoutSegments } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { getSiteFromPostId } from "@/lib/actions";
import { DiscordLogoIcon, LaptopIcon, StarFilledIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/sdk/package/radix/components/ui/button";

export default function Nav({ children, canUpgrade }: { canUpgrade: boolean; children: ReactNode }) {
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
          name: "Open Editor",
          href: `/editor/${id}`,
          isActive: segments.includes("edit"),
          icon: <ExternalLink width={18} />,
          target: "_self",
        },
        // {
        //   name: "Blogs",
        //   href: `/site/${id}`,
        //   isActive: segments.includes("site") && segments.length === 2,
        //   icon: <Newspaper width={18} />,
        // },
        {
          name: "Form Submissions",
          href: `/site/${id}/form-submission`,
          isActive: segments.includes("form-submission"),
          icon: <FileText width={18} />,
        },
        {
          name: "Domains",
          href: `/site/${id}/settings/domains`,
          isActive: segments.includes("settings") && segments.includes("domains"),
          icon: <Globe width={18} />,
        },
        {
          name: "Settings",
          href: `/site/${id}/settings`,
          isActive: segments.includes("settings") && !segments.includes("domains"),
          icon: <Settings width={18} />,
        },
      ];
    } else if (segments[0] === "post" && id) {
      return [
        {
          name: "Back to All Posts",
          href: id ? `/site/${siteId}` : "/",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Editor",
          href: `/post/${id}`,
          isActive: segments.length === 2,
          icon: <Edit3 width={18} />,
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
      {
        name: "Sites",
        href: "/",
        isActive: segments.length === 0,
        icon: <Globe width={18} />,
      },
      {
        name: "Apps",
        href: "https://apps.chaibuilder.com",
        icon: <AppWindow width={18} />,
        target: "_blank",
      },
      {
        name: "Settings",
        href: "/settings",
        isActive: segments[0] === "settings",
        icon: <Settings width={18} />,
      },
    ];
  }, [segments, id, siteId]);

  if (segments[0] === "editor" && id) return null;

  return (
    <>
      <div
        className={`z-10 flex h-screen w-full flex-col justify-between border-r border-stone-200 bg-stone-100 p-4 transition-all dark:border-stone-700 dark:bg-stone-900 sm:w-60 sm:translate-x-0`}>
        <div className="grid gap-2">
          <div className="flex items-center space-x-1 rounded-lg py-1.5">
            <Link href="/" className="rounded-lg p-2 hover:bg-stone-200 dark:hover:bg-stone-700">
              <Image
                src="https://ik.imagekit.io/n0uvizrukm2/chai-builder-logo-b-w_s_VR37ggn.png?updatedAt=1692613727383"
                width={24}
                height={24}
                alt="Logo"
                className="rounded-md dark:scale-110 dark:border dark:border-stone-400"
              />
            </Link>
            <span className="text-lg font-bold tracking-tight">Chai Builder</span>
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
            <br />
            {canUpgrade ? (
              <Link href={"/upgrade"}>
                <Button className="flex w-full items-center">
                  <StarFilledIcon className="mr-2" />
                  Upgrade
                </Button>
              </Link>
            ) : (
              <Button variant={"outline"} className="flex w-full items-center">
                <LaptopIcon className="mr-2" />
                Indie Hacker
              </Button>
            )}
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center justify-between">
            <Link
              href="https://discord.gg/AbNfQT7e3s"
              target="_blank"
              className={`flex w-full items-center space-x-2 rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800`}>
              <DiscordLogoIcon width={18} />
              <span className="text-sm font-medium">Join us on Discord</span>
            </Link>
            <Link
              href="https://twitter.com/chaibuilder"
              target="_blank"
              className={`flex w-full items-center space-x-2 rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800`}>
              <TwitterLogoIcon width={18} />
              <span className="text-sm font-medium">Follow on Twitter</span>
            </Link>
          </div>
          <div className="my-2 border-t border-stone-200 dark:border-stone-700" />
          {children}
        </div>
      </div>
    </>
  );
}
