import { unstable_cache } from "next/cache";
import { getRouteSnapshot } from "@/sdk/next/api-handlers/functions";

export const fetchRouteSnapshot = async (slug: string, domain: string, sourceCode: string[] = []) => {
  const onlyName = domain.replace(".chaibuilder.xyz", "");
  return await unstable_cache(async () => getRouteSnapshot(slug, onlyName, sourceCode), [`${onlyName}-${slug}`], {
    tags: [onlyName, `${onlyName}-${slug}`],
  })();
};
