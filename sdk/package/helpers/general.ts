import { STYLES_KEY } from "../constants/CONTROLS";

/**
 * Returns a boolean indicating whether the current environment is development
 * @returns {boolean} A boolean indicating whether the current environment is development
 */
export const isDevelopment = () => process.env.NODE_ENV === "development";

export const getSplitClasses = (classesString: string) => {
  const splitClasses: string[] = classesString.replace(STYLES_KEY, "").split(",");
  return { baseClasses: splitClasses[0], classes: splitClasses[1] };
};
