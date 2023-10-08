import { useMutation, useQuery } from "@tanstack/react-query";

export const useUiLibraryBlocks = () => {
  return useMutation(async () => {
    const res = await fetch("/library.json").then((res) => res.json());
    return res;
  });
};

export const useExternalPredefinedBlock = () => {
  return useMutation(async (block: any) => {
    if (!block || !block.uuid) return null;
    try {
      const res = await fetch(`/blocks/${block.uuid}.json`).then((res) => res.json());
      return res;
    } catch (error) {
      return {
        name: "Head 1",
        uuid: "7acb25c7-9e88-40cc-b83f-2d5d42eae54f",
        blocks: [{ _type: "Heading", content: "Head 1", level: "h1", _id: "a" }],
        html: "",
        group: "Header",
        preview: "https://fakeimg.pl/200x100?text=Head+1&font=bebas",
      };
    }
  });
};
