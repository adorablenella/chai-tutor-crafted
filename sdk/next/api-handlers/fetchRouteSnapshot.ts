import { unstable_cache } from "next/cache";
import { getRouteSnapshot } from "@/sdk/next/api-handlers/functions";

export const fetchRouteSnapshot = async (slug: string, domain: string) => {
  const onlyName = domain.replace(".chaibuilder.xyz", "");
  return await unstable_cache(async () => getRouteSnapshot(slug, onlyName), [`${domain}-${slug}`], {
    tags: [domain, `${domain}-${slug}`],
  })();
};
