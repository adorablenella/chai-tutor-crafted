import { useAtomValue } from "jotai";
import { builderPropsAtom } from "../store/extension";

export const useBuilderProps = () => {
  throw new Error("useBuilderProps is deprecated, use useBuilderProp instead");
  return useAtomValue(builderPropsAtom) as any;
};
