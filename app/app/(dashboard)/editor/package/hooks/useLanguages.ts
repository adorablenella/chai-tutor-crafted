import { useAtom } from "jotai";
import { isEmpty } from "lodash";
import { activeLanguageAtom, primaryLanguageAtom } from "../store/ui";
import { useBuilderProps } from "./useBuilderProps";

export const useActiveLanguage = () => useAtom(activeLanguageAtom);

export const usePrimaryLanguage = () => {
  const [primaryLanguage] = useAtom(primaryLanguageAtom);
  const [activeLanguage] = useLanguages();
  return [primaryLanguage, primaryLanguage === activeLanguage] as const;
};

export const useBlockLanguageProperty = (prop: string) => {
  const { languages } = useBuilderProps();
  const [activeLang] = useActiveLanguage();

  if (isEmpty(languages)) return prop;

  return `${prop}${activeLang ? `-${activeLang}` : ""}`;
};

export const useLanguages = () => {
  const { languages } = useBuilderProps();
  return languages;
};
