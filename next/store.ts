import { atom, useAtom } from "jotai";

const syncStatusAtom = atom<string>("SAVED");
export const useSyncState = (): [string, Function] => useAtom(syncStatusAtom);

const currentPageAtom = atom<string | null>(null);
export const useCurrentPage = (): [string, Function] => useAtom(currentPageAtom);

const currentPageSlugAtom = atom<string | null>(null);
export const useCurrentPageSlug = (): [string, Function] => useAtom(currentPageSlugAtom);
