import { isEmpty, startsWith } from "lodash";

/**
 * Check the passed value and converts it to valid css property value
 * @param value
 */
export function getBgImageValue(value: string) {
  if (isEmpty(value)) return "";
  return startsWith(value, "http") ? `url('${value}')` : value.replace(";", "");
}

/**
 * Get the unique uuid
 */
export function generateUUID(length: number = 6, chars = "abcdefghijklmnopqrstuvwxyzABCD"): string {
  let result = "";
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

export const getBreakpointValue = (width: number) =>
  width >= 1536
    ? "2XL"
    : width >= 1280
    ? "XL"
    : width >= 1024
    ? "LG"
    : width >= 768
    ? "MD"
    : width >= 640
    ? "SM"
    : "XS";
