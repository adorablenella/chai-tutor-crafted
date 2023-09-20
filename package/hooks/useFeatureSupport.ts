import { useAtom } from "jotai";
import { get } from "lodash";
import { chaiBuilderPropsAtom } from "../atoms/ChaiBuilderProps";

export const useFeatureSupport = (feature: string, defaultValue: boolean) => {
  const [builderProps] = useAtom(chaiBuilderPropsAtom);
  return get(builderProps, feature, defaultValue);
};
