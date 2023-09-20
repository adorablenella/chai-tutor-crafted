import { atom, useAtom } from "jotai";
import { get } from "lodash";
import { TBlock } from "../types/TBlock";

const activeLanguageAtom = atom<string>("en");
const primaryLanguageAtom = atom<string>("en");
const languagesAtom = atom<string[]>(["en"]);

export const useActiveLanguage = () => useAtom(activeLanguageAtom);

/**
 * Returns the primary language
 * @returns [primaryLanguage, isPrimaryLanguage] tuple where isPrimaryLanguage is true if the primary language is the active language
 */
export const usePrimaryLanguage = () => useAtom(primaryLanguageAtom);

/**
 * Returns the list of languages
 */
export const useLanguages = () => useAtom(languagesAtom);

interface BlockLangContent {
  content: string;
  propKey: string;
}

/**
 * Returns the block content for the active language
 * @param prop
 * @param block
 */
export const useBlockContentByLanguage = (prop: string, block: TBlock): BlockLangContent => {
  const [activeLang] = useActiveLanguage();
  // Return the active language prop if it exists
  const propKey = `${prop}${activeLang ? `-${activeLang}` : ""}`;
  return { content: get(block, propKey, get(block, prop, "")), propKey: prop };
};
