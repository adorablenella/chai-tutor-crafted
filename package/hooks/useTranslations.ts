import { atom, useAtom } from "jotai";
import { useCallback } from "react";
import { set } from "lodash";

type TBlockTranslation = {
  [_path: string]: any;
};

export const translationsAtom = atom<{ [key: string]: TBlockTranslation }>({ en: {} });

export const useTranslations = () => {
  const [translations, setTranslations] = useAtom(translationsAtom);

  const updateTranslation = useCallback(
    (lang: string, path: string, value: any) => {
      set(translations, `${lang}.${path}`, value);
      setTranslations(translations);
    },
    [translations, setTranslations]
  );

  return [translations, updateTranslation];
};
