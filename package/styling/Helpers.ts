import { first, get, includes, isEmpty, isNumber, map, startsWith } from "lodash";

export const WIDTH_HEIGHT_VALUES = {
  auto: "class",
  fit: "class",
  min: "class",
  max: "class",
  none: "class",
  px: { value: "1", unit: "px" },
  full: { value: "100", unit: "%" },

  // space
  reverse: "class",

  xs: { value: "320", unit: "px" },
  sm: { value: "384", unit: "px" },
  md: { value: "448", unit: "px" },
  lg: { value: "512", unit: "px" },
  xl: { value: "576", unit: "px" },
  "2xl": { value: "672", unit: "px" },
  "3xl": { value: "768", unit: "px" },
  "4xl": { value: "896", unit: "px" },
  "5xl": { value: "1024", unit: "px" },
  "6xl": { value: "1152", unit: "px" },
  "7xl": { value: "1280", unit: "px" },
  prose: { value: "65", unit: "ch" },
  "screen-sm": { value: "640", unit: "px" },
  "screen-md": { value: "768", unit: "px" },
  "screen-lg": { value: "1024", unit: "px" },
  "screen-xl": { value: "1280", unit: "px" },
  "screen-2xl": { value: "1536", unit: "px" },
};

export const FONT_SIZES = {
  // font
  xs: { value: "0.75", unit: "rem" },
  sm: { value: "0.875", unit: "rem" },
  base: { value: "1", unit: "rem" },
  lg: { value: "1.125", unit: "rem" },
  xl: { value: "1.25", unit: "rem" },
  "2xl": { value: "1.5", unit: "rem" },
  "3xl": { value: "1.875", unit: "rem" },
  "4xl": { value: "2.25", unit: "rem" },
  "5xl": { value: "3", unit: "rem" },
  "6xl": { value: "3.75", unit: "rem" },
  "7xl": { value: "4.5", unit: "rem" },
  "8xl": { value: "6", unit: "rem" },
  "9xl": { value: "8", unit: "rem" },
};

export const BORDER_RADIUS = {
  none: { value: "0", unit: "px" },
  sm: { value: "2", unit: "px" },
  "": { value: "4", unit: "px" },
  md: { value: "6", unit: "px" },
  lg: { value: "8", unit: "px" },
  xl: { value: "12", unit: "px" },
  "2xl": { value: "16", unit: "px" },
  "3xl": { value: "24", unit: "px" },
  full: { value: "9999", unit: "px" },
};
/**
 * Get the value and unit for a tw class
 * @param cls
 */
export const getTwClassValue = (cls: string): { unit: string; value: string } => {
  const isNegative = cls.startsWith("-") ? "-" : "";
  const twValue = cls.split("-").pop() as string;

  if (["auto", "none"].includes(twValue)) {
    return { value: "", unit: twValue };
  }

  if (twValue === "px") return { value: "1", unit: "px" };
  if (twValue === "screen") return { value: "100", unit: cls.indexOf("w-") !== -1 ? "vw" : "vh" };
  if (twValue === "full") return { value: "100", unit: "%" };

  // skew
  if (includes(cls, "skew-")) {
    return { value: `${isNegative}${twValue}`, unit: "deg" };
  }

  // skew
  if (includes(cls, "rotate-")) {
    return { value: `${isNegative}${twValue}`, unit: "deg" };
  }

  // opacity
  if (includes(cls, "opacity-")) {
    // @ts-ignore
    return { value: `${twValue / 100}`, unit: "-" };
  }

  // duration
  if (includes(cls, "duration-") || includes(cls, "delay-")) {
    return { value: `${twValue}`, unit: "ms" };
  }

  // skew
  if (includes(cls, "translate-")) {
    if (!twValue.includes("/")) {
      // @ts-ignore
      return { value: `${isNegative}${`${twValue / 4}`}`, unit: "rem" };
    }
  }

  // scale
  if (includes(cls, "scale-")) {
    // @ts-ignore
    return { value: `${isNegative}${`${twValue / 100}`}`, unit: "-" };
  }

  // borders
  if (startsWith(cls, "border")) {
    const regExpMatchArray = cls.match(/border-?(x|y|t|r|b|l)?\d+/g);
    if (regExpMatchArray) return { value: regExpMatchArray[0].split("-").pop() as string, unit: "px" };
    if (cls.match(/border-?(x|y|t|r|b|l)?/g)) return { value: "1", unit: "px" };
  }

  // max-w
  if (startsWith(cls, "max-w-")) {
    if (cls === "max-w-screen-sm") return { value: "640", unit: "px" };
    if (cls === "max-w-screen-md") return { value: "768", unit: "px" };
    if (cls === "max-w-screen-lg") return { value: "1024", unit: "px" };
    if (cls === "max-w-screen-xl") return { value: "1280", unit: "px" };
    if (cls === "max-w-screen-2xl") return { value: "1536", unit: "px" };
    if (twValue === "xs") return { value: "320", unit: "px" };
    if (twValue === "sm") return { value: "384", unit: "px" };
    if (twValue === "md") return { value: "448", unit: "px" };
    if (twValue === "lg") return { value: "512", unit: "px" };
    if (twValue === "xl") return { value: "576", unit: "px" };
    if (twValue === "2xl") return { value: "672", unit: "px" };
    if (twValue === "3xl") return { value: "768", unit: "px" };
    if (twValue === "4xl") return { value: "896", unit: "px" };
    if (twValue === "5xl") return { value: "1024", unit: "px" };
    if (twValue === "6xl") return { value: "1152", unit: "px" };
    if (twValue === "7xl") return { value: "1280", unit: "px" };
    if (twValue === "prose") return { value: "65", unit: "ch" };
  }
  if (startsWith(cls, "text-")) {
    if (twValue === "xs") return { value: "12", unit: "px" };
    if (twValue === "sm") return { value: "14", unit: "px" };
    if (twValue === "base") return { value: "16", unit: "px" };
    if (twValue === "lg") return { value: "18", unit: "px" };
    if (twValue === "xl") return { value: "20", unit: "px" };
    if (twValue === "2xl") return { value: "24", unit: "px" };
    if (twValue === "3xl") return { value: "30", unit: "px" };
    if (twValue === "4xl") return { value: "36", unit: "px" };
    if (twValue === "5xl") return { value: "48", unit: "px" };
    if (twValue === "6xl") return { value: "60", unit: "px" };
    if (twValue === "7xl") return { value: "72", unit: "px" };
    if (twValue === "8xl") return { value: "96", unit: "px" };
    if (twValue === "9xl") return { value: "128", unit: "px" };
  }
  if (startsWith(cls, "leading-")) {
    if (twValue === "none") return { value: "1", unit: "-" };
    if (twValue === "tight") return { value: "1.25", unit: "-" };
    if (twValue === "snug") return { value: "1.375", unit: "-" };
    if (twValue === "normal") return { value: "1.5", unit: "-" };
    if (twValue === "relaxed") return { value: "1.625", unit: "-" };
    if (twValue === "loose") return { value: "2", unit: "-" };
  }
  if (startsWith(cls, "tracking-")) {
    if (twValue === "tighter") return { value: "-0.05", unit: "em" };
    if (twValue === "tight") return { value: "-0.025", unit: "em" };
    if (twValue === "normal") return { value: "0", unit: "em" };
    if (twValue === "wide") return { value: "0.025", unit: "em" };
    if (twValue === "wider") return { value: "0.05", unit: "em" };
    if (twValue === "widest") return { value: "0.1", unit: "em" };
  }

  if (["max", "min", "fit"].includes(twValue)) return { value: cls, unit: "class" };

  if (twValue.includes("/")) {
    const [num, denom] = map(twValue.split("/"), (v) => parseInt(v, 10)) as [number, number];
    return { value: isNegative + ((num / denom) * 100).toFixed(2).replace(".00", ""), unit: `%` };
  }

  if (isNumber(parseFloat(twValue))) {
    return { value: `${isNegative + parseFloat(twValue) * 4}`, unit: "px" };
  }

  return { value: twValue, unit: "class" };
};
/**
 * Get the value and unit for a tw class
 * @param cls
 */
export const getMinWidthTwClassValue = (cls: string): { unit: string; value: string } => {
  const twValue = cls.split("-").pop() as string;
  if (twValue === "0") return { value: "0", unit: "px" };
  if (twValue === "full") return { value: "100", unit: "%" };
  if (["max", "min", "fit"].includes(twValue)) return { value: cls, unit: "class" };
  return { value: cls, unit: "class" };
};
/**
 * Get the value and unit for a tw class
 * @param className
 */
export const getClassValueAndUnit = (className: string): { unit: string; value: string } => {
  if (isEmpty(className)) {
    return { value: "", unit: "" };
  }
  const match: null | String[] = className.match(/\[.*\]/g);
  if (match === null) {
    return getValueAndUnitForTWClass(className);
  }
  const fullValue: string = get(match, "0", "").replace(/\[|\]/g, "");
  const isNegative = className.startsWith("-") ? "-" : "";
  const num = first(fullValue.match(/\d+.\d+|\d+/g)) as string;
  return { value: `${isNegative}${num}`, unit: fullValue.replace(num, "") };
};
/**
 * Get the value and unit for a tw class
 * @param className
 */
export const getValueAndUnitForTWClass = (className: string): { unit: string; value: string } => {
  if (isEmpty(className)) {
    return { value: "", unit: "" };
  }
  return getTwClassValue(className);
};
