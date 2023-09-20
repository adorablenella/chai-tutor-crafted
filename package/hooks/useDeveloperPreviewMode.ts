import { atom, useAtom } from "jotai";

const developerPreviewModeAtom = atom(false);

/**
 * Wrapper hook around useAtom
 */
export const useDeveloperPreviewMode = (): [boolean, Function] => {
  const [devPreviewMode, setDevPreviewMode] = useAtom(developerPreviewModeAtom);
  return [devPreviewMode, setDevPreviewMode];
};
