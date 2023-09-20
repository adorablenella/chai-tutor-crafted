import { atom, useAtom } from "jotai";

const syncStatusAtom = atom<string>("SAVED");
export const useSyncState = () => useAtom(syncStatusAtom);

const currentPageAtom = atom<string | null>(null);
export const useCurrentPage = () => useAtom(currentPageAtom);

const currentPageSlugAtom = atom<string | null>(null);
export const useCurrentPageSlug = () => useAtom(currentPageSlugAtom);
