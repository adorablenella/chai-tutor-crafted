import { useAtomValue } from "jotai";
import { builderPropsAtom } from "../store/extension";

export const useBuilderProps = () => useAtomValue(builderPropsAtom) as any;
