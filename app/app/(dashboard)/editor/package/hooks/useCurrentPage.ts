import { atom, useAtomValue } from "jotai";

export const currentPageAtom: any = atom<string | null>(null);

export const useCurrentPage = () => {
  const currentPage = useAtomValue(currentPageAtom);
  return { currentPage };
};
