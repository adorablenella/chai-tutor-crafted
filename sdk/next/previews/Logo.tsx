import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { last, split } from "lodash";
import { useMemo } from "react";

const Logo = () => {
  const pathname = usePathname();

  const redirectTo = useMemo(() => {
    if (pathname?.includes("/editor/")) {
      const uuid = last(split(pathname, "/"));
      if (uuid) {
        return `/site/${uuid}/settings/domains`;
      }
    }
    return "/";
  }, [pathname]);

  return (
    <div>
      <div className="flex items-center rounded-lg py-1.5">
        <Link href={redirectTo} className="rounded-lg p-2 hover:bg-stone-200 dark:hover:bg-stone-700">
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
    </div>
  );
};

export default Logo;
