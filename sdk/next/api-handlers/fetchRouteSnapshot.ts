import { unstable_cache } from "next/cache";
import { getRouteSnapshot } from "@/sdk/next/api-handlers/functions";

export const fetchRouteSnapshot = async (domain: string, slug: string = "") => {
  const domainName = domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "");
  return await unstable_cache(async () => getRouteSnapshot(domainName, slug), [`${domainName}-${slug}`], {
    tags: [domainName, `${domainName}-${slug}`],
  })();
};
