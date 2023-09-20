import { flatten, flattenDeep, map, range, values } from "lodash";
import { CLASS_VALUES } from "./CLASS_VALUES";

type ClassListType = {
  [key: string]: {
    classes: Array<string>;
    regExp: string;
  };
};

export const CLASSES_LIST: ClassListType = {
  textColor: {
    classes: [],
    regExp: "text-(black|transparent|current|white|primary(-\\d+)?|secondary(-\\d+)?|\\S+-\\d+)",
  },
  // LAYOUT
  aspectRatio: {
    classes: ["aspect-auto", "aspect-square", "aspect-video"],
    regExp: `aspect-(auto|square|video)`,
  },
  container: {
    classes: ["container"],
    regExp: `container`,
  },
  columns: {
    classes: map(CLASS_VALUES.columns, (val) => `columns-${val}`),
    regExp: `columns-(auto|[0-9]xl|[0-9]xs|xs|sm|md|lg|xl|\\d+)`,
  },
  breakAfter: {
    classes: map(CLASS_VALUES.breakAfter, (val) => `break-after-${val}`),
    regExp: "break-after-\\S+",
  },
  breakBefore: {
    classes: map(CLASS_VALUES.breakAfter, (val) => `break-before-${val}`),
    regExp: "break-before-\\S+",
  },
  breakInside: {
    classes: map(CLASS_VALUES.breakInside, (val) => `break-inside-${val}`),
    regExp: `break-inside-\\S+`,
  },
  boxDecoration: {
    classes: ["box-decoration-clone", "box-decoration-slice"],
    regExp: "box-decoration-\\S+",
  },
  boxSizing: {
    classes: ["box-border", "box-content"],
    regExp: `box-(border|content)`,
  },

  flexDirection: {
    classes: ["flex-row", "flex-row-reverse", "flex-col", "flex-col-reverse"],
    regExp: "flex-(row|row-reverse|col|col-reverse)",
  },
  flexWrap: {
    classes: ["flex-wrap", "flex-wrap-reverse", "flex-nowrap"],
    regExp: "flex-(wrap|wrap-reverse|nowrap)",
  },
  flexGrowShrink: {
    classes: ["flex-1", "flex-auto", "flex-initial", "flex-none"],
    regExp: "flex-1|flex-auto|flex-initial|flex-none",
  },

  gridColumns: {
    classes: map([...range(0, 13), "none"], (val) => `grid-cols-${val}`),
    regExp: "grid-cols-(\\d+|none)",
  },

  gridFlow: {
    classes: ["grid-flow-row", "grid-flow-col", "grid-flow-row-dense", "grid-flow-col-dense"],
    regExp: "grid-flow-(row|col|row-dense|col-dense)",
  },

  outlineStyle: {
    classes: map(["none", "dashed", "dotted", "double", "hidden"], (v) => `outline-${v}`),
    regExp: "outline-(none|dashed|dotted|double|hidden)",
  },
  borderStyle: {
    classes: map(["solid", "dashed", "dotted", "double", "hidden", "none"], (v) => `border-${v}`),
    regExp: "border-(solid|dashed|dotted|double|hidden|none)",
  },
  overflow: {
    classes: map(CLASS_VALUES.overflow, (val) => `overflow-${val}`),
    regExp: `overflow-(${CLASS_VALUES.overflow.join("|")})`,
  },
  overflowX: {
    classes: map(CLASS_VALUES.overflow, (val) => `overflow-x-${val}`),
    regExp: `overflow-x-(${CLASS_VALUES.overflow.join("|")})`,
  },
  overflowY: {
    classes: map(CLASS_VALUES.overflow, (val) => `overflow-y-${val}`),
    regExp: `overflow-y-(${CLASS_VALUES.overflow.join("|")})`,
  },
  gridRows: { classes: map([1, 2, 3, 4, 5, 6, "none"], (v) => `grid-rows-${v}`), regExp: "grid-rows-(\\d|none)" },
  display: {
    classes: map(CLASS_VALUES.display, (val) => val.toString()),
    regExp: `(${CLASS_VALUES.display.join("|")})`,
  },
  float: {
    classes: ["float-right", "float-left", "float-none"],
    regExp: `float-\\S+`,
  },
  clear: {
    classes: ["clear-right", "clear-left", "clear-none", "clear-both"],
    regExp: "clear-\\S+",
  },
  isolation: {
    classes: ["isolate", "isolation-auto"],
    regExp: "isolate|isolation-auto",
  },
  objectFit: {
    classes: map(CLASS_VALUES.objectFit, (val) => `object-${val}`),
    regExp: `object-(contain|cover|fill|none|scale-down)`,
  },
  objectPosition: {
    classes: map(CLASS_VALUES.objectPosition, (val) => `object-${val}`),
    regExp: `object-(${CLASS_VALUES.objectPosition.join("|")})`,
  },

  overscroll: {
    classes: map(CLASS_VALUES.overscroll, (val) => `overscroll-${val}`),
    regExp: `overscroll-(${CLASS_VALUES.overscroll.join("|")})`,
  },
  overscrollX: {
    classes: map(CLASS_VALUES.overscroll, (val) => `overscroll-x-${val}`),
    regExp: `overscroll-x-(${CLASS_VALUES.overscroll.join("|")})`,
  },
  overscrollY: {
    classes: map(CLASS_VALUES.overscroll, (val) => `overscroll-y-${val}`),
    regExp: `overscroll-y-(${CLASS_VALUES.overscroll.join("|")})`,
  },

  inset: {
    classes: map(CLASS_VALUES.trbl, (val) => `inset-${val}`),
    regExp: `-?inset-(px|\\d\\/\\d|\\d\\.\\d|\\d+|full|auto|\\[.*\\])`,
  },
  insetX: {
    classes: map(CLASS_VALUES.trbl, (val) => `inset-x-${val}`),
    regExp: `-?inset-x-(px|\\d\\/\\d|\\d\\.\\d|\\d+|full|auto|\\[.*\\])`,
  },
  insetY: {
    classes: map(CLASS_VALUES.trbl, (val) => `inset-y-${val}`),
    regExp: `-?inset-y-(px|\\d\\/\\d|\\d\\.\\d|\\d+|full|auto|\\[.*\\])`,
  },
  top: {
    classes: map(CLASS_VALUES.trbl, (val) => `top-${val}`),
    regExp: `-?top-(px|\\d\\/\\d|\\d\\.\\d|\\d+|full|auto|\\[.*\\])`,
  },
  topX: {
    classes: map(CLASS_VALUES.trbl, (val) => `top-x-${val}`),
    regExp: `-?top-x-(px|\\d\\/\\d|\\d\\.\\d|\\d+|full|auto|\\[.*\\])`,
  },
  topY: {
    classes: map(CLASS_VALUES.trbl, (val) => `top-y-${val}`),
    regExp: `-?top-y-(px|\\d\\/\\d|\\d\\.\\d|\\d+|full|auto|\\[.*\\])`,
  },

  right: {
    classes: map(CLASS_VALUES.trbl, (val) => `right-${val}`),
    regExp: `-?right-(px|\\d\\/\\d|\\d\\.\\d|\\d+|full|auto|\\[.*\\])`,
  },
  rightX: {
    classes: map(CLASS_VALUES.trbl, (val) => `right-x-${val}`),
    regExp: `-?right-x-(px|\\d\\/\\d|\\d\\.\\d|\\d+|full|auto|\\[.*\\])`,
  },
  rightY: {
    classes: map(CLASS_VALUES.trbl, (val) => `right-y-${val}`),
    regExp: `-?right-y-(px|\\d\\/\\d|\\d\\.\\d|\\d+|full|auto|\\[.*\\])`,
  },
  bottom: {
    classes: map(CLASS_VALUES.trbl, (val) => `bottom-${val}`),
    regExp: `-?bottom-(px|\\d\\/\\d|\\d\\.\\d|\\d+|full|auto|\\[.*\\])`,
  },
  bottomX: {
    classes: map(CLASS_VALUES.trbl, (val) => `bottom-x-${val}`),
    regExp: `-?bottom-x-(px|\\d\\/\\d|\\d\\.\\d|\\d+|full|auto|\\[.*\\])`,
  },
  bottomY: {
    classes: map(CLASS_VALUES.trbl, (val) => `bottom-y-${val}`),
    regExp: `-?bottom-y-(px|\\d\\/\\d|\\d\\.\\d|\\d+|full|auto|\\[.*\\])`,
  },
  left: {
    classes: map(CLASS_VALUES.trbl, (val) => `left-${val}`),
    regExp: `-?left-(px|\\d\\/\\d|\\d\\.\\d|\\d+|full|auto|\\[.*\\])`,
  },
  leftX: {
    classes: map(CLASS_VALUES.trbl, (val) => `left-x-${val}`),
    regExp: `-?left-x-(px|\\d\\/\\d|\\d\\.\\d|\\d+|full|auto|\\[.*\\])`,
  },
  leftY: {
    classes: map(CLASS_VALUES.trbl, (val) => `left-y-${val}`),
    regExp: `-?left-y-(px|\\d\\/\\d|\\d\\.\\d|\\d+|full|auto|\\[.*\\])`,
  },
  visibility: {
    classes: ["visible", "invisible"],
    regExp: "invisible|visible",
  },
  zIndex: {
    classes: map(["0", 10, 20, 30, 40, 50, "auto"], (val) => `z-${val}`),
    regExp: "-?z-(\\d+|auto|\\[.*\\])",
  },

  // Flex box and grids
  flexBasis: {
    classes: map(CLASS_VALUES.flexBasis, (val) => `basis-${val}`),
    regExp: "basis-(\\d+|\\S+)",
  },

  flexGrow: { classes: ["grow", "grow-0"], regExp: "grow(-0)?" },
  flexShrink: { classes: ["shrink", "shrink-0"], regExp: "shrink(-0)?" },

  // grid
  gridColSpan: {
    classes: ["col-auto", ...map(range(1, 13), (num) => `col-span-${num}`), "col-span-full"],
    regExp: "col-(auto|span-(\\d+|full))",
  },
  gridColStart: {
    classes: [...map(range(1, 14), (num) => `col-start-${num}`), "col-start-auto"],
    regExp: "col-start-(\\d+|auto)",
  },
  gridColEnd: {
    classes: [...map(range(1, 14), (num) => `col-end-${num}`), "col-end-auto"],
    regExp: "col-end-(\\d+|auto)",
  },

  gridRowSpan: {
    classes: ["row-auto", ...map(range(1, 7), (num) => `row-span-${num}`), "row-span-full"],
    regExp: "row-(auto|span-(\\d+|full))",
  },
  gridRowStart: {
    classes: [...map(range(1, 8), (num) => `row-start-${num}`), "row-start-auto"],
    regExp: "row-start-(\\d+|auto)",
  },
  gridRowEnd: {
    classes: [...map(range(1, 8), (num) => `row-end-${num}`), "row-end-auto"],
    regExp: "row-end-(\\d+|auto)",
  },

  gridAutoColumns: {
    classes: ["auto-cols-auto", "auto-cols-min", "auto-cols-max", "auto-cols-fr"],
    regExp: "auto-cols-(auto|min|max|fr)",
  },
  gridAutoRows: {
    classes: ["auto-rows-auto", "auto-rows-min", "auto-rows-max", "auto-rows-fr"],
    regExp: "auto-rows-(auto|min|max|fr)",
  },

  gap: { classes: map(CLASS_VALUES.indent, (v) => `gap-${v}`), regExp: "gap-(px|\\d.\\d|\\d|\\[.*\\])" },
  gapX: { classes: map(CLASS_VALUES.indent, (v) => `gap-x-${v}`), regExp: "gap-x-(px|\\d.\\d|\\d|\\[.*\\])" },
  gapY: { classes: map(CLASS_VALUES.indent, (v) => `gap-y-${v}`), regExp: "gap-y-(px|\\d.\\d|\\d|\\[.*\\])" },

  justifyContent: {
    classes: ["justify-start", "justify-end", "justify-center", "justify-between", "justify-around", "justify-evenly"],
    regExp: "justify-(start|end|center|between|around|evenly)",
  },
  justifyItems: {
    classes: ["justify-items-start", "justify-items-end", "justify-items-center", "justify-items-stretch"],
    regExp: "justify-items-(start|end|center|stretch)",
  },
  justifySelf: {
    classes: [
      "justify-self-auto",
      "justify-self-start",
      "justify-self-end",
      "justify-self-center",
      "justify-self-stretch",
    ],
    regExp: "justify-self-(auto|start|end|center|stretch)",
  },

  placeContent: {
    classes: [
      "place-content-center",
      "place-content-start",
      "place-content-end",
      "place-content-between",
      "place-content-around",
      "place-content-evenly",
      "place-content-stretch",
    ],
    regExp: "place-content-(center|start|end|between|around|evenly|stretch)",
  },
  placeItems: {
    classes: ["place-items-start", "place-items-end", "place-items-center", "place-items-stretch"],
    regExp: "place-items-(start|end|center|stretch)",
  },
  placeSelf: {
    classes: ["place-self-auto", "place-self-start", "place-self-end", "place-self-center", "place-self-stretch"],
    regExp: "place-self-(auto|start|end|center|stretch)",
  },

  alignContent: {
    classes: ["content-center", "content-start", "content-end", "content-between", "content-around", "content-evenly"],
    regExp: "content-(center|start|end|between|around|evenly)",
  },
  alignItems: {
    classes: ["items-start", "items-end", "items-center", "items-baseline", "items-stretch"],
    regExp: "items-(start|end|center|baseline|stretch)",
  },
  alignSelf: {
    classes: ["self-auto", "self-start", "self-end", "self-center", "self-stretch", "self-baseline"],
    regExp: "self-(auto|start|end|center|stretch|baseline)",
  },

  backgroundClip: {
    classes: ["bg-clip-border", "bg-clip-padding", "bg-clip-content", "bg-clip-text"],
    regExp: "bg-clip-(border|padding|content|text)",
  },

  // FIXME: Add drop-shadow class
  dropShadow: {
    classes: map(["sm", "md", "lg", "xl", "2xl", "none"], (val) => `drop-shadow-${val}`),
    regExp: "drop-shadow-(sm|md|lg|xl|2xl|none)",
  },

  backdropBlur: {
    classes: map(["none", "sm", "md", "lg", "xl", "2xl", "3xl"], (val) => `backdrop-blur-${val}`),
    regExp: "backdrop-blur-(none|sm|md|lg|xl|2xl|3xl)",
  },
  backdropBrightness: {
    classes: map([0, 50, 75, 90, 95, 100, 105, 110, 125, 150, 200], (val) => `backdrop-brightness-${val}`),
    regExp: "backdrop-brightness-(\\d+)",
  },
  backdropContrast: {
    classes: map([0, 50, 75, 100, 125, 150, 200], (val) => `backdrop-contrast-${val}`),
    regExp: "backdrop-contrast-(\\d+)",
  },
  backdropGrayScale: {
    classes: ["backdrop-grayscale-0", "backdrop-grayscale"],
    regExp: "backdrop-grayscale(-0)?",
  },
  backdropHueRotate: {
    classes: map([0, 15, 30, 60, 90, 180], (val) => `backdrop-hue-rotate-${val}`),
    regExp: "-?backdrop-hue-rotate-(\\d+)",
  },
  backdropInvert: {
    classes: ["backdrop-invert-0", "backdrop-invert"],
    regExp: "backdrop-invert(-0)?",
  },
  backdropOpacity: {
    classes: map([0, 5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100], (val) => `backdrop-opacity-${val}`),
    regExp: "backdrop-opacity-(\\d+)",
  },
  backdropSaturate: {
    classes: map([0, 50, 100, 150, 200], (val) => `backdrop-saturate-${val}`),
    regExp: "backdrop-saturate-(\\d+)",
  },
  backdropSepia: {
    classes: ["backdrop-sepia-0, backdrop-sepia"],
    regExp: "backdrop-sepia(-0)?",
  },
  backgroundOrigin: {
    classes: ["bg-origin-border", "bg-origin-padding", "bg-origin-content"],
    regExp: "bg-origin-(border|padding|content)",
  },

  transformOrigin: {
    classes: map(CLASS_VALUES.origin, (val) => `origin-${val}`),
    regExp: "origin-(\\d+|\\S+)",
  },

  // spacing
  padding: {
    classes: map(CLASS_VALUES.padding, (val) => `p-${val}`),
    regExp: "p-(\\d+|\\S+|\\[.*\\])",
  },
  paddingX: {
    classes: map(CLASS_VALUES.padding, (val) => `px-${val}`),
    regExp: "px-(\\d+|\\S+|\\[.*\\])",
  },
  paddingY: {
    classes: map(CLASS_VALUES.padding, (val) => `py-${val}`),
    regExp: "py-(\\d+|\\S+|\\[.*\\])",
  },
  paddingTop: {
    classes: map(CLASS_VALUES.padding, (val) => `pt-${val}`),
    regExp: "pt-(\\d+|\\S+|\\[.*\\])",
  },
  paddingRight: {
    classes: map(CLASS_VALUES.padding, (val) => `pr-${val}`),
    regExp: "pr-(\\d+|\\S+|\\[.*\\])",
  },
  paddingBottom: {
    classes: map(CLASS_VALUES.padding, (val) => `pb-${val}`),
    regExp: "pb-(\\d+|\\S+|\\[.*\\])",
  },
  paddingLeft: {
    classes: map(CLASS_VALUES.padding, (val) => `pl-${val}`),
    regExp: "pl-(\\d+|\\S+|\\[.*\\])",
  },

  textDecorationStyle: {
    classes: ["decoration-solid", "decoration-double", "decoration-dotted", "decoration-dashed", "decoration-wavy"],
    regExp: "decoration-(solid|double|dotted|dashed|wavy)",
  },

  textDecorationThickness: {
    classes: map(["auto", "from-font", "0", 1, 2, 4, 8], (val) => `decoration-${val}`),
    regExp: "decoration-(auto|from-font|\\d+|\\S+)",
  },

  fromColor: {
    classes: [],
    regExp: "from-(black|transparent|current|white|primary(-\\d+)?|secondary(-\\d+)?|\\S+-\\d+)",
  },
  margin: {
    classes: map(CLASS_VALUES.margin, (val) => `m-${val}`),
    regExp: "-?m-(\\d+|\\S+|\\[.*\\])",
  },
  marginX: {
    classes: map(CLASS_VALUES.margin, (val) => `mx-${val}`),
    regExp: "-?mx-(\\d+|\\S+|\\[.*\\])",
  },
  marginY: {
    classes: map(CLASS_VALUES.margin, (val) => `my-${val}`),
    regExp: "-?my-(\\d+|\\S+|\\[.*\\])",
  },
  marginTop: {
    classes: map(CLASS_VALUES.margin, (val) => `mt-${val}`),
    regExp: "-?mt-(\\d+|\\S+|\\[.*\\])",
  },
  marginRight: {
    classes: map(CLASS_VALUES.margin, (val) => `mr-${val}`),
    regExp: "-?mr-(\\d+|\\S+|\\[.*\\])",
  },
  marginBottom: {
    classes: map(CLASS_VALUES.margin, (val) => `mb-${val}`),
    regExp: "-?mb-(\\d+|\\S+|\\[.*\\])",
  },
  marginLeft: {
    classes: map(CLASS_VALUES.margin, (val) => `ml-${val}`),
    regExp: "-?ml-(\\d+|\\S+|\\[.*\\])",
  },

  spaceX: {
    classes: map(CLASS_VALUES.space, (v) => `space-x-${v}`),
    regExp: "-?space-x-(\\d+|\\S+|\\[.*\\])",
  },
  spaceY: {
    classes: map(CLASS_VALUES.space, (v) => `space-y-${v}`),
    regExp: "-?space-y-(\\d+|\\S+|\\[.*\\])",
  },
  boxShadow: {
    classes: map(["sm", "md", "lg", "xl", "2xl", "inner", "none"], (v) => `shadow-${v}`),
    regExp: "shadow-(sm|md|lg|xl|2xl|inner|none)",
  },

  // sizing
  minWidth: {
    classes: ["min-w-0", "min-w-full", "min-w-min", "min-w-max", "min-w-fit"],
    regExp: "min-w-(\\d+|\\S+|\\[.*\\])",
  },
  maxWidth: {
    classes: map(CLASS_VALUES.maxWidth, (v) => `max-w-${v}`),
    regExp: "max-w-(\\d+|\\S+|\\[.*\\])",
  },
  width: {
    classes: map([...CLASS_VALUES.width, ...["full", "screen", "min", "max", "fit"]], (v) => `w-${v}`),
    regExp: "w-(\\d+.\\d+|\\d+|px|auto|full|screen|min|max|fit|\\[.*\\])",
  },

  minHeight: {
    classes: ["min-h-0", "min-h-full", "min-h-screen", "min-h-min", "min-h-max", "min-h-fit"],
    regExp: "min-h-(\\d+|\\S+|\\[.*\\])",
  },

  maxHeight: {
    classes: map(CLASS_VALUES.maxHeight, (v) => `max-h-${v}`),
    regExp: "max-h-(\\d+|\\S+|\\[.*\\])",
  },
  height: {
    classes: map(CLASS_VALUES.height, (v) => `h-${v}`),
    regExp: "h-(\\d+.\\d+|\\d+|px|auto|full|screen|min|max|fit|\\[.*\\])",
  },

  // typography
  fontFamily: {
    classes: ["font-heading", "font-body", "font-sans", "font-serif", "font-mono"],
    regExp: "font-(heading|body|sans|serif|mono)",
  },
  textAlign: {
    classes: ["text-left", "text-center", "text-right", "text-justify"],
    regExp: "text-(left|center|right|justify)",
  },
  textOverflow: {
    classes: ["truncate", "text-ellipsis", "text-clip"],
    regExp: "truncate|text-ellipsis|text-clip",
  },
  verticalAlign: {
    classes: [
      "align-baseline",
      "align-top",
      "align-middle",
      "align-bottom",
      "align-text-top",
      "align-text-bottom",
      "align-sub",
      "align-super",
    ],
    regExp: "align-(baseline|top|middle|bottom|text-top|text-bottom|sub|super)",
  },
  fontSize: {
    classes: [
      "text-xs",
      "text-sm",
      "text-base",
      "text-lg",
      "text-xl",
      "text-2xl",
      "text-3xl",
      "text-4xl",
      "text-5xl",
      "text-6xl",
      "text-7xl",
      "text-8xl",
      "text-9xl",
    ],
    regExp: "text-(\\d+|\\S+|\\[.*\\])",
  },
  fontSmoothing: {
    classes: ["antialiased", "subpixel-antialiased"],
    regExp: "antialiased|subpixel-antialiased",
  },
  fontStyle: { classes: ["italic", "not-italic"], regExp: "not-italic|italic" },
  fontWeight: {
    classes: [
      "font-thin",
      "font-extralight",
      "font-light",
      "font-normal",
      "font-medium",
      "font-semibold",
      "font-bold",
      "font-extrabold",
      "font-black",
    ],
    regExp: "font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)",
  },
  fontVariantNum: {
    classes: [
      "normal-nums",
      "ordinal",
      "diagonal-fractions",
      "stacked-fractions",
      "tabular-nums",
      "oldstyle-nums",
      "proportional-nums",
      "lining-nums",
      "slashed-zero",
    ],
    regExp:
      "normal-nums|ordinal|diagonal-fractions|stacked-fractions|tabular-nums|oldstyle-nums|proportional-nums|lining-nums|slashed-zero",
  },
  letterSpacing: {
    classes: [
      "tracking-tighter",
      "tracking-tight",
      "tracking-normal",
      "tracking-wide",
      "tracking-wider",
      "tracking-widest",
    ],
    regExp: "-?tracking-(tighter|tight|normal|wide|wider|widest|\\[.*\\])",
  },
  lineHeight: {
    classes: [
      "leading-none",
      "leading-tight",
      "leading-snug",
      "leading-normal",
      "leading-relaxed",
      "leading-loose",
      "leading-3",
      "leading-4",
      "leading-5",
      "leading-6",
      "leading-7",
      "leading-8",
      "leading-9",
      "leading-10",
    ],
    regExp: "leading-(none|tight|snug|normal|relaxed|loose|\\[.*\\]|\\d+)",
  },
  listStyleType: {
    classes: ["list-none", "list-disc", "list-decimal"],
    regExp: "list-(none|disc|decimal)",
  },
  listStylePosition: {
    classes: ["list-inside", "list-outside"],
    regExp: "list-(inside|outside)",
  },

  textUnderlineOffset: {
    classes: [
      "underline-offset-auto",
      "underline-offset-0",
      "underline-offset-1",
      "underline-offset-2",
      "underline-offset-4",
      "underline-offset-8",
    ],
    regExp: "underline-offset-(auto|\\d+|\\S+)",
  },

  textDecoration: {
    classes: ["underline", "overline", "line-through", "no-underline"],
    regExp: "underline|overline|line-through|no-underline",
  },

  textDecorationColor: {
    classes: [],
    regExp: "decoration-(black|transparent|current|white|primary(-\\d+)?|secondary(-\\d+)?|\\S+-\\d+)",
  },

  textTransform: {
    classes: ["uppercase", "lowercase", "capitalize", "normal-case"],
    regExp: "uppercase|lowercase|capitalize|normal-case",
  },

  textIndent: {
    classes: map(CLASS_VALUES.indent, (v) => `indent-${v}`),
    regExp: "-?indent-(\\d+|\\S+)",
  },

  whitespace: {
    classes: [
      "whitespace-normal",
      "whitespace-no-wrap",
      "whitespace-pre",
      "whitespace-pre-line",
      "whitespace-pre-wrap",
    ],
    regExp: "whitespace-(normal|no-wrap|pre|pre-line|pre-wrap)",
  },
  wordBreak: {
    classes: ["break-normal", "break-words", "break-all"],
    regExp: "break-(normal|words|all)",
  },
  content: { classes: ["content-none"], regExp: "content-none" },

  backgroundColor: {
    classes: [],
    regExp: "bg-(black|transparent|current|white|primary(-\\d+)?|secondary(-\\d+)?|\\S+-\\d+)",
  },

  backgroundAttachment: {
    classes: ["bg-fixed", "bg-local", "bg-scroll"],
    regExp: "bg-(fixed|local|scroll)",
  },

  backgroundPosition: {
    classes: [
      "bg-bottom",
      "bg-center",
      "bg-left",
      "bg-left-bottom",
      "bg-left-top",
      "bg-right",
      "bg-right-bottom",
      "bg-right-top",
      "bg-top",
    ],
    regExp: "bg-(bottom|center|left|left-bottom|left-top|right|right-bottom|right-top|top)",
  },
  backgroundRepeat: {
    classes: ["bg-repeat", "bg-repeat-x", "bg-repeat-y", "bg-no-repeat", "bg-repeat-round", "bg-repeat-space"],
    regExp: "bg-(repeat|repeat-x|repeat-y|no-repeat|repeat-round|repeat-space)",
  },
  backgroundSize: {
    classes: ["bg-auto", "bg-cover", "bg-contain"],
    regExp: "bg-(auto|cover|contain)",
  },
  backgroundGradient: {
    classes: [
      "bg-gradient-none",
      "bg-gradient-to-t",
      "bg-gradient-to-tr",
      "bg-gradient-to-r",
      "bg-gradient-to-br",
      "bg-gradient-to-b",
      "bg-gradient-to-bl",
      "bg-gradient-to-l",
      "bg-gradient-to-tl",
    ],
    regExp: "bg-gradient-(none|to-(t|tr|r|br|b|bl|l|tl))",
  },

  viaColor: {
    classes: [],
    regExp: "via-(black|transparent|current|white|primary(-\\d+)?|secondary(-\\d+)?|\\S+-\\d+)",
  },
  toColor: {
    classes: [],
    regExp: "to-(black|transparent|current|white|primary(-\\d+)?|secondary(-\\d+)?|\\S+-\\d+)",
  },

  position: {
    classes: ["static", "fixed", "absolute", "relative", "sticky"],
    regExp: `(static|fixed|absolute|relative|sticky)`,
  },

  // border

  borderRadiusTopLeft: {
    classes: ["rounded-tl", ...map(CLASS_VALUES.borderRadius, (v) => `rounded-tl-${v}`)],
    regExp: "rounded-tl-?(\\d+|\\S+)?",
  },
  borderRadiusTopRight: {
    classes: ["rounded-tr", ...map(CLASS_VALUES.borderRadius, (v) => `rounded-tr-${v}`)],
    regExp: "rounded-tr-?(\\d+|\\S+)?",
  },
  borderRadiusBottomRight: {
    classes: ["rounded-br", ...map(CLASS_VALUES.borderRadius, (v) => `rounded-br-${v}`)],
    regExp: "rounded-br-?(\\d+|\\S+)?",
  },
  borderRadiusBottomLeft: {
    classes: ["rounded-bl", ...map(CLASS_VALUES.borderRadius, (v) => `rounded-bl-${v}`)],
    regExp: "rounded-bl-?(\\d+|\\S+)?",
  },

  borderRadiusTop: {
    classes: ["rounded-t", ...map(CLASS_VALUES.borderRadius, (v) => `rounded-t-${v}`)],
    regExp: "rounded-t-?(\\d+|\\S+)?",
  },
  borderRadiusRight: {
    classes: ["rounded-r", ...map(CLASS_VALUES.borderRadius, (v) => `rounded-r-${v}`)],
    regExp: "rounded-r-?(\\d+|\\S+)?",
  },
  borderRadiusBottom: {
    classes: ["rounded-b", ...map(CLASS_VALUES.borderRadius, (v) => `rounded-b-${v}`)],
    regExp: "rounded-b-?(\\d+|\\S+)?",
  },
  borderRadiusLeft: {
    classes: ["rounded-l", ...map(CLASS_VALUES.borderRadius, (v) => `rounded-l-${v}`)],
    regExp: `(rounded-l-(${CLASS_VALUES.borderRadius.join("|")})|rounded-l$)`,
  },
  borderRadius: {
    classes: ["rounded", ...map(CLASS_VALUES.borderRadius, (v) => `rounded-${v}`)],
    regExp: `(rounded-(${CLASS_VALUES.borderRadius.join("|")}$)|rounded)`,
  },

  borderX: {
    classes: ["border-x", ...map(CLASS_VALUES.borderWidth, (v) => `border-x-${v}`)],
    regExp: "border-x-?(\\d+|\\S+|\\[.*\\])?",
  },
  borderY: {
    classes: ["border-y", ...map(CLASS_VALUES.borderWidth, (v) => `border-y-${v}`)],
    regExp: "border-y-?(\\d+|\\S+|\\[.*\\])?",
  },
  borderTop: {
    classes: ["border-t", ...map(CLASS_VALUES.borderWidth, (v) => `border-t-${v}`)],
    regExp: "border-t-?(\\d+|\\S+|\\[.*\\])?",
  },
  borderRight: {
    classes: ["border-r", ...map(CLASS_VALUES.borderWidth, (v) => `border-r-${v}`)],
    regExp: "border-r-?(\\d+|\\S+|\\[.*\\])?",
  },
  borderBottom: {
    classes: ["border-b", ...map(CLASS_VALUES.borderWidth, (v) => `border-b-${v}`)],
    regExp: "border-b-?(\\d+|\\S+|\\[.*\\])?",
  },
  borderLeft: {
    classes: ["border-l", ...map(CLASS_VALUES.borderWidth, (v) => `border-l-${v}`)],
    regExp: "border-l-?(\\d+|\\S+|\\[.*\\])?",
  },

  borderColor: {
    classes: [],
    regExp: "border-(black|transparent|current|white|primary(-\\d+)?|secondary(-\\d+)?|\\S+-\\d+)",
  },

  border: {
    classes: ["border", ...map(CLASS_VALUES.borderWidth, (v) => `border-${v}`)],
    regExp: "border-?(\\d+|\\S+|\\[.*\\])?",
  },

  order: {
    classes: map([...range(0, 13), "first", "last", "none"], (val) => `order-${val}`),
    regExp: "-?order-(\\d+|first|last|none)",
  },

  divideXWidth: {
    classes: map(["0", 2, 4, 8], (v) => `divide-x-${v}`),
    regExp: "divide-x-(\\d+|\\[.*\\])",
  },
  divideYWidth: {
    classes: map(["0", 2, 4, 8], (v) => `divide-y-${v}`),
    regExp: "divide-y-(\\d+|\\[.*\\])",
  },
  divideColor: {
    classes: [],
    regExp: "divide-(black|transparent|current|white|primary(-\\d+)?|secondary(-\\d+)?|\\S+-\\d+)",
  },
  divideStyle: {
    classes: map(["solid", "dashed", "dotted", "double", "none"], (v) => `divide-${v}`),
    regExp: "divide-(solid|dashed|dotted|double|none)",
  },

  outlineWidth: {
    classes: map([0, 1, 2, 4, 8], (v) => `outline-${v}`),
    regExp: "outline-(\\d+)",
  },

  outlineOffset: {
    classes: map([0, 1, 2, 4, 8], (v) => `outline-offset-${v}`),
    regExp: "outline-offset-(\\d+)",
  },

  outlineColor: {
    classes: [],
    regExp: "outline-(black|transparent|current|white|primary(-\\d+)?|secondary(-\\d+)?|\\S+-\\d+)",
  },
  ringWidth: {
    classes: map([0, 1, 2, 4, 8, "inset"], (v) => `ring-${v}`),
    regExp: "ring-(\\d+|inset)",
  },

  ringOffsetWidth: {
    classes: map([0, 1, 2, 4, 8], (v) => `ring-offset-${v}`),
    regExp: "ring-offset-(\\d+)",
  },
  ringOffsetColor: {
    classes: [],
    regExp: "ring-offset-(black|transparent|current|white|primary(-\\d+)?|secondary(-\\d+)?|\\S+-\\d+)",
  },
  ringColor: {
    classes: [],
    regExp: "ring-(black|transparent|current|white|primary(-\\d+)?|secondary(-\\d+)?|\\S+-\\d+)",
  },
  // Effects
  // FIXME: "add shadow class

  boxShadowColor: {
    classes: [],
    regExp: "shadow-(black|transparent|current|white|primary(-\\d+)?|secondary(-\\d+)?|\\S+-\\d+)",
  },
  opacity: {
    classes: map([0, 5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100], (v) => `opacity-${v}`),
    regExp: "opacity-(\\d+|\\[.*\\])",
  },
  mixBlendMode: {
    classes: map(CLASS_VALUES.blendEffect, (v) => `mix-blend-${v}`),
    regExp: "mix-blend-(\\d+|\\S+)",
  },
  bgBlendMode: {
    classes: map(CLASS_VALUES.blendEffect, (v) => `bg-blend-${v}`),
    regExp: "bg-blend-(\\d+|\\S+)",
  },

  // filters
  blur: {
    classes: map(["none", "sm", "md", "lg", "xl", "2xl", "3xl"], (val) => `blur-${val}`),
    regExp: "blur-(none|sm|md|lg|xl|2xl|3xl)",
  },
  brightness: {
    classes: map([0, 50, 75, 90, 95, 100, 105, 110, 125, 150, 200], (val) => `brightness-${val}`),
    regExp: "brightness-(\\d+)",
  },
  contrast: {
    classes: map([0, 50, 75, 100, 125, 150, 200], (val) => `contrast-${val}`),
    regExp: "contrast-(\\d+)",
  },

  grayScale: {
    classes: ["grayscale-0", "grayscale"],
    regExp: "grayscale(-0)?",
  },
  hueRotate: {
    classes: map([0, 15, 30, 60, 90, 180], (val) => `hue-rotate-${val}`),
    regExp: "-?hue-rotate-(\\d+)",
  },
  invert: { classes: ["invert-0", "invert"], regExp: "invert(-0)?" },
  saturate: {
    classes: map([0, 50, 100, 150, 200], (val) => `saturate-${val}`),
    regExp: "saturate-(\\d+)",
  },
  sepia: { classes: ["sepia-0", "sepia"], regExp: "sepia(-0)?" },

  // transitions
  transition: {
    classes: [
      "transition-none",
      "transition-all",
      // "transition",
      "transition-colors",
      "transition-opacity",
      "transition-shadow",
      "transition-transform",
    ],
    regExp: "transition-(none|all|colors|opacity|shadow|transform)",
  },
  duration: {
    classes: map([75, 100, 150, 200, 300, 500, 700, 1000], (val) => `duration-${val}`),
    regExp: "duration-(\\d+|\\[.*\\])",
  },
  transitionEase: {
    classes: ["ease-linear", "ease-in", "ease-out", "ease-in-out"],
    regExp: "eas(e-linear|e-in|e-out|e-in-out)",
  },
  transitionDelay: {
    classes: map([75, 100, 150, 200, 300, 500, 700, 1000], (val) => `delay-${val}`),
    regExp: "delay-(\\d+|\\[.*\\])",
  },
  animation: {
    classes: ["animation-none", "animation-spin", "animation-ping"],
    regExp: "animation-(none|spin|ping)",
  },

  scaleX: {
    classes: map(CLASS_VALUES.scale, (val) => `scale-x-${val}`),
    regExp: "-?scale-x-(\\d+|\\S+|\\[.*\\])",
  },
  scaleY: {
    classes: map(CLASS_VALUES.scale, (val) => `scale-y-${val}`),
    regExp: "-?scale-y-(\\d+|\\S+|\\[.*\\])",
  },
  scale: {
    classes: map(CLASS_VALUES.scale, (val) => `scale-${val}`),
    regExp: "-?scale-(\\d+|\\S+|\\[.*\\])",
  },
  rotate: {
    classes: map([0, 1, 2, 3, 6, 12, 45, 90, 180], (val) => `rotate-${val}`),
    regExp: "-?rotate-(\\d+|\\S+|\\[.*\\])",
  },
  translateX: {
    classes: map([0, "px", "0.5", 1], (val) => `translate-x-${val}`),
    regExp: "-?translate-x-(\\d+|\\S+|\\[.*\\])",
  },
  translateY: {
    classes: map([0, "px", "0.5", 1], (val) => `translate-y-${val}`),
    regExp: "-?translate-y-(\\d+|\\S+|\\[.*\\])",
  },
  skewX: {
    classes: map([0, 1, 2, 3, 6, 12], (val) => `skew-x-${val}`),
    regExp: "-?skew-x-(\\d+|\\S+|\\[.*\\])",
  },
  skewY: {
    classes: map([0, 1, 2, 3, 6, 12], (val) => `skew-y-${val}`),
    regExp: "-?skew-y-(\\d+|\\S+|\\[.*\\])",
  },

  // interactivity
  accentColor: {
    classes: [],
    regExp: "accent-(black|transparent|current|white|primary(-\\d+)?|secondary(-\\d+)?|\\S+-\\d+)",
  },
  appearance: { classes: ["appearance-none"], regExp: "appearance-none" },
  cursor: {
    classes: [
      "cursor-auto",
      "cursor-default",
      "cursor-pointer",
      "cursor-wait",
      "cursor-text",
      "cursor-move",
      "cursor-help",
      "cursor-not-allowed",
    ],
    regExp: "cursor-(auto|default|pointer|wait|text|move|help|not-allowed)",
  },
  caretColor: {
    classes: [],
    regExp: "caret-(black|transparent|current|white|primary(-\\d+)?|secondary(-\\d+)?|\\S+-\\d+)",
  },
  pointerEvents: {
    classes: ["pointer-events-none", "pointer-events-auto"],
    regExp: "pointer-events-(none|auto)",
  },
  userSelect: {
    classes: ["select-none", "select-text", "select-all", "select-auto"],
    regExp: "select-(none|text|all|auto)",
  },

  // SVG
  fill: { classes: [], regExp: "caret-(black|transparent|current|white|primary(-\\d+)?|secondary(-\\d+)?|\\S+-\\d+)" },
  stroke: {
    classes: [],
    regExp: "caret-(black|transparent|current|white|primary(-\\d+)?|secondary(-\\d+)?|\\S+-\\d+)",
  },
  strokeWidth: {
    classes: ["stroke-0", "stroke-1", "stroke-2"],
    regExp: "stroke-(\\d+|\\[.*\\])",
  },
};

const colorOptions = {
  backgroundColor: "bg",
  textColor: "text",
  borderColor: "border",
  boxShadowColor: "shadow",
  outlineColor: "outline",
  divideColor: "divide",
  fromColor: "from",
  viaColor: "via",
  toColor: "to",
  ringColor: "ring",
  ringOffsetColor: "ring-offset",
};

const soloColors = ["current", "inherit", "transparent", "black", "white", "primary", "secondary"];
const chaiColors = ["primary", "secondary"];
const shadedColors = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
];
const shades = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
const colorKeys = map(values(colorOptions), (val) => val);

const ALL_COLORS = flattenDeep([
  ...map(soloColors, (color) => flatten(map(colorKeys, (key) => `${key}-${color}`))),
  ...map(chaiColors, (color) =>
    flattenDeep(map(colorKeys, (key) => flattenDeep(map(shades, (shade) => `${key}-${color}-${shade}`))))
  ),
  ...map(shadedColors, (color) =>
    flattenDeep(map(colorKeys, (key) => flattenDeep(map(shades, (shade) => `${key}-${color}-${shade}`))))
  ),
]);

export const ALL_TW_CLASSES = map(
  flattenDeep(
    values(CLASSES_LIST)
      .map((val) => val.classes)
      .concat(ALL_COLORS)
  ),
  (cls) => ({
    name: cls,
  })
);
