import { findIndex, isEmpty, startsWith } from "lodash";
import { TBlock } from "../types/TBlock";
import { STYLES_KEY } from "../constants/CONTROLS";

/**
 * Returns a boolean indicating whether the current environment is development
 * @returns {boolean} A boolean indicating whether the current environment is development
 */
export const isDevelopment = () => process.env.NODE_ENV === "development";

export function getBgImageValue(value: string) {
  if (isEmpty(value)) return "";
  return startsWith(value, "http") ? `url('${value}')` : value.replace(";", "");
}

export function insertBlockAtIndex(arr: TBlock[], parentId: string | null, destinationIndex: number, newObj: TBlock) {
  const parentIndex = findIndex(arr, { parent: parentId });
  const insertIndex = parentIndex + destinationIndex;
  arr.splice(insertIndex, 0, newObj);
  return arr;
}

export const getSplitClasses = (classesString: string) => {
  const splitClasses: string[] = classesString.replace(STYLES_KEY, "").split(",");
  return { baseClasses: splitClasses[0], classes: splitClasses[1] };
};
