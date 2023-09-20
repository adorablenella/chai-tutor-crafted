import { map, range } from "lodash";

type ClassValuesType = {
  [key: string]: Array<string | number>;
};

const STANDARD = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96,
];

// prettier-ignore
export const CLASS_VALUES: ClassValuesType = {
  columns: [ ...range(1, 13), "auto", "3xs", "2xs", "xs", "sm", "md", "lg", "xl", ...map(range(2, 8), (num) => `${num}xl`) ],
  breakAfter: ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"],
  breakInside: ["auto", "avoid", "avoid-page", "avoid-column"],
  display: [ "block", "flex", "grid", "inline-block", "inline", "hidden" ],
  objectFit: ["contain", "cover", "fill", "none", "scale-down"],
  objectPosition: ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"],
  overflow: ["auto", "hidden", "clip", "visible", "scroll"],
  overscroll: ["auto", "contain", "none"],
  trbl: [ 0, "px", "0.5", 1, 1.5, 2, 2.5, 3, 3.5, ...range(4, 13), 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96, "auto", "1/2", "1/3", "2/3", "1/4", "2/4", "3/4", "full", ],
  flexBasis: [ ...STANDARD, "auto", "px", "0.5", "1.5", "2.5", "3.5", "1/2", "1/3", "2/3", "1/4", "2/4", "3/4", "1/5", "2/5", "3/5", "4/5", "1/6", "2/6", "3/6", "4/6", "5/6", "1/12", "2/12", "3/12", "4/12", "5/12", "6/12", "7/12", "8/12", "9/12", "10/12", "11/12", "full", ],
  padding: [...STANDARD, "px", "0.5", "1.5", "2.5", "3.5"],
  margin: ["auto", ...STANDARD, "px", "0.5", "1.5", "2.5", "3.5"],
  scale: [0, 50, 75, 90, 95, 100, 105, 110, 125, 150],
  origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left"],
  blendEffect: [ "normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", ],
  borderWidth: [0, 2, 4, 8],
  borderRadius: ["global", "none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"],
  indent: [ 0, "px", "0.5", 1, 1.5, 2, 2.5, 3, 3.5, ...range(4, 13), 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96, ],
  maxHeight: [ 0, "px", "0.5", 1, 1.5, 2, 2.5, 3, 3.5, ...range(4, 13), 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96, "full", "screen", "min", "max", "fit", ],
  space: [ 0, "px", "0.5", 1, 1.5, 2, 2.5, 3, 3.5, ...range(4, 13), 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96, "px", "reverse", ],
  width: [ "0", "px", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "5", "6", "7", "8", "9", "10", "11", "12", "14", "16", "20", "24", "28", "32", "36", "40", "44", "48", "52", "56", "60", "64", "72", "80", "96", "auto", "1/2", "1/3", "2/3", "1/4", "2/4", "3/4", "1/5", "2/5", "3/5", "4/5", "1/6", "2/6", "3/6", "4/6", "5/6", "1/12", "2/12", "3/12", "4/12", "5/12", "6/12", "7/12", "8/12", "9/12", "10/12", "11/12", ],
  maxWidth: ['0', 'none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 'full', 'min', 'max', 'fit', 'prose', 'screen-sm', 'screen-md', 'screen-lg', 'screen-xl', 'screen-2xl',],
  height: ['0','px','0.5','1','1.5','2','2.5','3','3.5','4','5','6','7','8','9','10','11','12','14','16','20','24','28','32','36','40','44','48','52','56','60','64','72','80','96','auto','1/2','1/3','2/3','1/4','2/4','3/4','1/5','2/5','3/5','4/5','1/6','2/6','3/6','4/6','5/6','full','screen','min','max','fit']
};
