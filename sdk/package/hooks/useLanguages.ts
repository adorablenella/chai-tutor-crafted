import { useBuilderProp } from "./useBuilderProp";

export const useLanguages = () => {
  return useBuilderProp("languages", ["en"]);
};
