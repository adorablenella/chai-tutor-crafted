import { useMutation } from "@tanstack/react-query";
import { getBlocksFromHTML } from "@/sdk/package/html-to-blocks";
import { capitalize, filter, has, set, sortBy } from "lodash";

export const useUiLibraryBlocks = () => {
  return useMutation(async () => {
    const resp = await fetch(`/library.json`).then((res) => res.json());
    return sortBy(
      filter(resp, (block) => !has(block, "hidden")),
      "group",
    );
  });
};

export const useExternalPredefinedBlock = () => {
  return useMutation(async (block: any) => {
    if (!block || !block.uuid) return null;
    try {
      const res = await fetch(`/${block.uuid}.${block.format}`).then(async (res) =>
        block.format === "html" ? getBlocksFromHTML(await res.text()) : await res.json(),
      );
      set(res, "0._name", capitalize(block.group));
      return res || [];
    } catch (error) {
      return [];
    }
  });
};
