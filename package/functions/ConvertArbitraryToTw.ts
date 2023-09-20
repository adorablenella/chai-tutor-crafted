import { first, get, includes, keys, map, parseInt } from "lodash";
import { PER_VALUE_TO_TW_CLASS, PX_VALUE_TO_TW_CLASS } from "../constants/TWCLASS_VALUES";
import { ClassDerivedObject, constructClassObject } from "./Class";

const REM_BASE = 16;
const PX_TO_TW_DIVIDER = 4;

function convertRemToPxIfNeeded(arbitraryValue: string) {
  if (arbitraryValue.indexOf("rem") !== -1) {
    // eslint-disable-next-line no-param-reassign
    arbitraryValue = `${parseFloat(arbitraryValue.replace("rem", "")) * REM_BASE}px`;
  }
  return arbitraryValue;
}

export const convertArbitraryToTw = (className: string) => {
  const value: RegExpMatchArray | null = className.match(/\[.*\]/);
  if (value === null) return className;

  const classObj: null | ClassDerivedObject = constructClassObject(className);
  if (classObj === null) {
    return className;
  }

  const { property } = classObj;

  let arbitraryValue: string = first(value as any[])
    .replace(/\]/i, "")
    .replace(/\[/i, "");

  const classKey: string = className.replace(/\[.*\]/i, "");

  arbitraryValue = convertRemToPxIfNeeded(arbitraryValue);

  let twClassName: string = className;
  switch (property) {
    case "top":
    case "right":
    case "left":
    case "bottom":
    case "inset":
    case "insetX":
    case "insetY":
    case "gap":
    case "gapX":
    case "gapY":
    case "padding":
    case "paddingX":
    case "paddingY":
    case "paddingTop":
    case "paddingRight":
    case "paddingBottom":
    case "paddingLeft":
    case "margin":
    case "marginX":
    case "marginY":
    case "marginTop":
    case "marginRight":
    case "marginBottom":
    case "marginLeft":
    case "flexBasis":
    case "width":
    case "height":
    case "maxHeight":
    case "textIndent":
    case "spaceX":
    case "spaceY":
      if (arbitraryValue.indexOf("px") !== -1) {
        // @ts-ignore
        const baseIncrementalPXValues: string[] = map(keys(PX_VALUE_TO_TW_CLASS), (num: number) => `${num}px`);
        if (includes(baseIncrementalPXValues, arbitraryValue)) {
          const numericValue: number = parseInt(arbitraryValue.replace("px", ""), 10);
          if (numericValue === 1) {
            twClassName = `${classKey}px`;
          } else {
            twClassName = classKey + numericValue / PX_TO_TW_DIVIDER;
          }
        }
      }
      if (arbitraryValue.indexOf("%") !== -1) {
        // @ts-ignore
        const baseIncrementalPercentValues: string[] = map(keys(PER_VALUE_TO_TW_CLASS), (num: number) => `${num}%`);
        if (includes(baseIncrementalPercentValues, arbitraryValue)) {
          const numericValue: number = parseFloat(arbitraryValue.replace("%", ""));
          twClassName = classKey + get(PER_VALUE_TO_TW_CLASS, numericValue);
        }
      }
      if (arbitraryValue.indexOf("vw") !== -1) {
        const numericValue: number = parseFloat(arbitraryValue.replace("vw", ""));
        if (numericValue === 100) {
          twClassName = `${classKey}screen`;
        }
      }
      if (arbitraryValue.indexOf("vh") !== -1) {
        const numericValue: number = parseFloat(arbitraryValue.replace("vh", ""));
        if (numericValue === 100) {
          twClassName = `${classKey}screen`;
        }
      }
      break;

    case "minWidth":
      if (arbitraryValue.indexOf("%") !== -1) {
        const numericValue: number = parseFloat(arbitraryValue.replace("%", ""));
        if (numericValue === 100) {
          twClassName = `${classKey}full`;
        }
      }
      if (arbitraryValue === "0px") {
        twClassName = "min-w-0";
      }
      break;
    case "maxWidth":
      if (arbitraryValue === "0px") {
        twClassName = "max-w-0";
      }

      // eslint-disable-next-line no-case-declarations
      const pxMapper: { [px: string]: string } = {
        "320px": "xs",
        "384px": "sm",
        "448px": "md",
        "512px": "lg",
        "576px": "xl",
        "672px": "2xl",
        "768px": "3xl",
        "896px": "4xl",
        "1024px": "5xl",
        "1152px": "6xl",
        "1280px": "7xl",
        "100%": "full",
        "65ch": "prose",
        "640px": "screen-sm",
        "1536px": "screen-2xl",
      };
      if (includes(keys(pxMapper), arbitraryValue)) {
        twClassName = `max-w-${pxMapper[arbitraryValue]}`;
      }
      break;

    case "minHeight":
      if (arbitraryValue.indexOf("%") !== -1) {
        const numericValue: number = parseFloat(arbitraryValue.replace("%", ""));
        if (numericValue === 100) {
          twClassName = `${classKey}full`;
        }
      }
      if (arbitraryValue === "0px") {
        twClassName = "min-h-0";
      }
      if (arbitraryValue === "100vh") {
        twClassName = "min-h-screen";
      }
      break;

    case "fontSize":
      // eslint-disable-next-line no-case-declarations
      const fontSizeMapper: any = {
        "12px": "xs",
        "14px": "sm",
        "16px": "base",
        "18px": "lg",
        "20px": "xl",
        "24px": "2xl",
        "30px": "3xl",
        "36px": "4xl",
        "48px": "5xl",
        "60px": "6xl",
        "72px": "7xl",
        "96px": "8xl",
        "128px": "9xl",
      };
      if (includes(keys(fontSizeMapper), arbitraryValue)) {
        twClassName = classKey + fontSizeMapper[arbitraryValue];
      }
      break;
    case "lineHeight":
      // eslint-disable-next-line no-case-declarations
      const lineHeightMapper: any = {
        "12px": "3",
        "16px": "4",
        "20px": "5",
        "24px": "6",
        "28px": "7",
        "32px": "8",
        "36px": "9",
        "40px": "10",
        "1": "none",
        "1.25": "tight",
        "1.375": "snug",
        "1.5": "normal",
        "1.625": "relaxed",
        "2": "loose",
      };
      if (includes(keys(lineHeightMapper), arbitraryValue)) {
        twClassName = classKey + lineHeightMapper[arbitraryValue];
      }
      break;

    case "zIndex":
      // eslint-disable-next-line no-case-declarations
      const zIndexTw: string[] = ["0", "10", "20", "30", "40", "50"];
      twClassName = zIndexTw.indexOf(arbitraryValue) !== -1 ? `${classKey}${arbitraryValue}` : className;
      break;

    case "opacity":
      // eslint-disable-next-line no-case-declarations
      const values: string[] = [
        "0",
        "5",
        "10",
        "20",
        "25",
        "30",
        "40",
        "50",
        "60",
        "70",
        "75",
        "80",
        "90",
        "95",
        "100",
      ];
      // eslint-disable-next-line no-case-declarations
      const opacity: number = parseFloat(arbitraryValue) * 100;
      if (includes(values, opacity.toString())) {
        twClassName = `opacity-${opacity}`;
      }
      break;
    default:
      break;
  }
  return twClassName;
};
