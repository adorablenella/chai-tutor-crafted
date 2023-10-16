import { useMutation } from "@tanstack/react-query";
import { getBlocksFromHTML } from "@/sdk/package/html-to-blocks";

export const useUiLibraryBlocks = () => {
  return useMutation(async () => {
    return await fetch(`/library.json`).then((res) => res.json());
  });
};

export const useExternalPredefinedBlock = () => {
  return useMutation(async (block: any) => {
    if (!block || !block.uuid) return null;
    try {
      const res = await fetch(`/${block.uuid}.${block.format}`).then(async (res) =>
        block.format === "html" ? getBlocksFromHTML(await res.text()) : await res.json(),
      );
      return res || [];
    } catch (error) {
      return [];
    }
  });
};
