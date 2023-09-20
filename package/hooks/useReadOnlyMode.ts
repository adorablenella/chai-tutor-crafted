import { useAtomValue } from "jotai";
import { readOnlyModeAtom } from "../store/ui";

export const useReadOnlyMode = () => useAtomValue(readOnlyModeAtom);
