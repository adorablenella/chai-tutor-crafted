import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { last, split } from "lodash";
import { useMemo } from "react";
import { useSyncState } from "../store";
import { toast } from "sonner";

const Logo = () => {
  const [syncState] = useSyncState();
  const pathname = usePathname();
  const router = useRouter();

  const redirectTo = useMemo(() => {
    if (pathname?.includes("/editor/")) {
      const uuid = last(split(pathname, "/"));
      if (uuid) {
        return `/site/${uuid}/settings/domains`;
      }
    }
    return "/";
  }, [pathname]);

  const onRedirect = () => {
    if (syncState !== "SAVED") {
      toast.error("You have unsaved changes. Please save before closing the app.");
    } else {
      router.push(redirectTo);
    }
  };

  return (
    <div>
      <div className="flex items-center rounded-lg py-1.5">
        <div onClick={onRedirect} className="cursor-pointer rounded-lg p-2 hover:bg-stone-200 dark:hover:bg-stone-700">
          <Image
            src="https://ik.imagekit.io/n0uvizrukm2/chai-builder-logo-b-w_s_VR37ggn.png?updatedAt=1692613727383"
            width={24}
            height={24}
            alt="Logo"
            className="rounded-md dark:scale-110 dark:border dark:border-stone-400"
          />
        </div>
        <span className="text-lg font-bold tracking-tight">Chai Builder</span>
      </div>
    </div>
  );
};

export default Logo;
