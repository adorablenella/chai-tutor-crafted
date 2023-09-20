import { atom, useAtom } from "jotai";

const previewModeAtom = atom(false);

/**
 *
 */
export const usePreviewMode = (): [boolean, Function] => {
  const [previewMode, setPreviewMode] = useAtom(previewModeAtom);
  return [previewMode, setPreviewMode];
};
