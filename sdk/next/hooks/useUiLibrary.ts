import { useMutation } from "@tanstack/react-query";
const BUCKET = "chaibuilder-blob-storage";
const BUCKET_API = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}`;

export const useUiLibraryBlocks = () => {
  return useMutation(async () => {
    const res = await fetch(`${BUCKET_API}/predefined-blocks/library.json?t=2023-10-09`).then((res) => res.json());
    return res;
  });
};

export const useExternalPredefinedBlock = () => {
  return useMutation(async (block: any) => {
    if (!block || !block.uuid) return null;
    try {
      const res = await fetch(`${BUCKET_API}/predefined-blocks/blocks/${block.uuid}.json`).then((res) => res.json());
      return res || [];
    } catch (error) {
      return [];
    }
  });
};
