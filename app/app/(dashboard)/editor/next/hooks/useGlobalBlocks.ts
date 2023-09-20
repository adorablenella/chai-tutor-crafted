import { useQuery } from "@tanstack/react-query";
import { TPageData } from "../types";

export const useGlobalBLocks = () =>
  useQuery({
    queryKey: ["global blocks"],
    queryFn: async () => {
      const globalBlocks: TPageData[] = await fetch(`/api/chaibuilder/global-blocks`).then((res) => res.json());
      return globalBlocks || [];
    },
  });
