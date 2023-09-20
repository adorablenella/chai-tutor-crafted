import { useQuery } from "@tanstack/react-query";
import { useUser } from "./useUser";
import { BRANDING_OPTIONS_DEFAULTS } from "../../package/constants/MODIFIERS";

export const useBrandingOptions = () => {
  const [user] = useUser();
  return useQuery({
    queryKey: ["branding_options"],
    queryFn: async () =>
      // TODO: fetch studio data
      // await fetch('/chaibuilder/branding-options').then((res) => res.json()) as TStudioData,
      ({ pages: [], websiteData: { branding_options: BRANDING_OPTIONS_DEFAULTS } } as any),
    enabled: !!user,
  });
};
