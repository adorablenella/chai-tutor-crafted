import { ManualClasses } from "./ManualClasses";

const BASIC_UNITS: string[] = ["px", "%", "em", "rem", "ch", "vh", "vw"];

export const FLEX_CHILD_SECTION = {
  heading: "Flex Child",
  items: [
    { type: "arbitrary", label: "Basis", units: BASIC_UNITS, property: "flexBasis" },
    { type: "range", label: "Order", property: "order" },
    { type: "dropdown", label: "Flex", property: "flexGrowShrink" },
    { type: "dropdown", label: "Grow", property: "flexGrow" },
    { type: "dropdown", label: "Shrink", property: "flexShrink" },
  ],
};

export const GRID_CHILD_SECTION = {
  heading: "Grid Child",
  items: [
    { type: "range", label: "Col Span", property: "gridColSpan" },
    { type: "range", label: "Col Start", property: "gridColStart" },
    { type: "range", label: "Col End", property: "gridColEnd" },
    { type: "range", label: "Row Span", property: "gridRowSpan" },
    { type: "range", label: "Row Start", property: "gridRowStart" },
    { type: "range", label: "Row End", property: "gridRowEnd" },
    { type: "range", label: "Order", property: "order" },
  ],
};

export const SETTINGS_SECTIONS = [
  {
    heading: "Display",
    items: [
      { type: "dropdown", label: "Display", property: "display", units: BASIC_UNITS },
      {
        styleType: "accordion",
        heading: "Flex options",
        items: [
          { type: "dropdown", label: "Direction", property: "flexDirection" },
          { type: "dropdown", label: "Wrap", property: "flexWrap" },
          { type: "dropdown", label: "Justify", property: "justifyContent" },
          { type: "dropdown", label: "Content", property: "alignContent" },
          { type: "dropdown", label: "Items", property: "alignItems" },
          {
            styleType: "multiple",
            label: "Gap",
            options: [
              { key: "gap", label: "All" },
              { key: "gapX", label: "Left-Right" },
              { key: "gapY", label: "Top-Bottom" },
            ],
          },
        ],
        conditions: { display: "flex" },
      },
      {
        styleType: "accordion",
        heading: "Grid options",
        items: [
          { type: "range", label: "Columns", property: "gridColumns" },
          { type: "range", label: "Rows", property: "gridRows" },
          { type: "dropdown", label: "Auto Flow", property: "gridAutoFlow" },
          { type: "dropdown", label: "Auto Cols", property: "gridAutoColumns" },
          { type: "dropdown", label: "Auto Rows", property: "gridAutoRows" },
          { type: "dropdown", label: "Justify", property: "justifyContent" },
          { type: "dropdown", label: "Content", property: "alignContent" },
          { type: "dropdown", label: "Items", property: "alignItems" },
          {
            styleType: "multiple",
            label: "Gap",
            units: ["px", "rem"],
            options: [
              { key: "gap", label: "All" },
              { key: "gapX", label: "Left-Right" },
              { key: "gapY", label: "Top-Bottom" },
            ],
          },
        ],
        conditions: { display: "grid" },
      },
      {
        styleType: "accordion",
        heading: "Visibility & Opacity",
        items: [
          { type: "dropdown", label: "Visibility", property: "visibility", units: BASIC_UNITS },
          { type: "arbitrary", label: "Opacity", property: "opacity", units: ["-"] },
        ],
      },
    ],
  },
  {
    heading: "Spacing",
    items: [
      {
        styleType: "multiple",
        label: "Margin",
        negative: true,
        units: [...BASIC_UNITS, "auto"],
        options: [
          { key: "margin", label: "All" },
          { key: "marginX", label: "Left-Right" },
          { key: "marginY", label: "Top-Bottom" },
          { key: "marginTop", label: "Top" },
          { key: "marginRight", label: "Right" },
          { key: "marginBottom", label: "Bottom" },
          { key: "marginLeft", label: "Left" },
        ],
      },
      {
        styleType: "multiple",
        label: "Padding",
        options: [
          { key: "padding", label: "All" },
          { key: "paddingX", label: "Left-Right" },
          { key: "paddingY", label: "Top-Bottom" },
          { key: "paddingTop", label: "Top" },
          { key: "paddingRight", label: "Right" },
          { key: "paddingBottom", label: "Bottom" },
          { key: "paddingLeft", label: "Left" },
        ],
      },
      {
        styleType: "multiple",
        label: "Space Between",
        options: [
          { key: "spaceX", label: "Left-Right" },
          { key: "spaceY", label: "Top-Bottom" },
        ],
      },
    ],
  },
  {
    heading: "Size",
    items: [
      { type: "arbitrary", label: "Width", units: BASIC_UNITS.concat("auto"), property: "width" },
      { type: "arbitrary", label: "Height", units: BASIC_UNITS.concat("auto"), property: "height" },
      {
        styleType: "accordion",
        heading: "Min width & height",
        items: [
          { type: "arbitrary", label: "Min Width", units: BASIC_UNITS.concat("auto"), property: "minWidth" },
          { type: "arbitrary", label: "Min Height", units: BASIC_UNITS.concat("auto"), property: "minHeight" },
        ],
      },
      {
        styleType: "accordion",
        heading: "Max width & height",
        items: [
          { type: "arbitrary", label: "Max Width", units: BASIC_UNITS.concat("auto"), property: "maxWidth" },
          { type: "arbitrary", label: "Max Height", units: BASIC_UNITS.concat("auto"), property: "maxHeight" },
        ],
      },
      {
        styleType: "accordion",
        heading: "Object options & aspect ratio",
        items: [
          { type: "dropdown", label: "Aspect", property: "aspectRatio" },
          { type: "dropdown", label: "Fit", property: "objectFit" },
          { type: "dropdown", label: "Position", property: "objectPosition" },
        ],
      },
    ],
  },
  {
    heading: "Position",
    items: [
      { type: "icons", label: "Position", property: "position" },
      {
        styleType: "accordion",
        heading: "Position options",
        items: [
          {
            styleType: "multiple",
            label: "Direction",
            options: [
              { key: "top", label: "Top" },
              { key: "right", label: "Right" },
              { key: "bottom", label: "Bottom" },
              { key: "left", label: "Left" },
            ],
          },
          {
            styleType: "multiple",
            label: "Inset",
            options: [
              { key: "inset", label: "All" },
              { key: "insetX", label: "Left Right" },
              { key: "insetY", label: "Top Bottom" },
            ],
          },
          { type: "arbitrary", label: "Z-Chai", units: ["-", "auto"], property: "zIndex" },
        ],
      },
      {
        styleType: "accordion",
        heading: "Float & Clear",
        items: [
          { type: "icons", label: "Float", property: "float" },
          { type: "dropdown", label: "Clear", property: "clear" },
        ],
      },

      {
        styleType: "accordion",
        heading: "Overflow & Overscroll",
        items: [
          {
            styleType: "multiple",
            type: "dropdown",
            label: "Overflow",
            options: [
              { key: "overflow", label: "All" },
              { key: "overflowX", label: "Left-Right" },
              { key: "overflowY", label: "Top-Bottom" },
            ],
          },
          {
            styleType: "multiple",
            type: "dropdown",
            label: "Overscroll",
            options: [
              { key: "overscroll", label: "All" },
              { key: "overscrollX", label: "Left-Right" },
              { key: "overscrollY", label: "Top-Bottom" },
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "Typography",
    items: [
      { type: "dropdown", property: "fontFamily", label: "Font" },
      { type: "arbitrary", property: "fontSize", label: "Size", units: BASIC_UNITS },
      { type: "arbitrary", property: "lineHeight", label: "Height", units: BASIC_UNITS.concat("-") },
      { type: "range", property: "fontWeight", label: "Weight" },
      { type: "color", property: "textColor", label: "Color" },
      {
        styleType: "accordion",
        heading: "Alignments",
        items: [
          { type: "dropdown", property: "textAlign", label: "Align" },
          { type: "dropdown", property: "verticalAlign", label: "V. Align" },
        ],
      },
      {
        styleType: "accordion",
        heading: "Spacing, decoration & more",
        items: [
          { type: "dropdown", property: "letterSpacing", label: "Spacing" },
          { type: "dropdown", property: "textDecoration", label: "Decoration" },
          { type: "range", property: "textDecorationThickness", label: "Thickness" },
          { type: "dropdown", property: "textTransform", label: "Transform" },
        ],
      },
      {
        styleType: "accordion",
        heading: "White space & breaks",
        items: [
          { type: "dropdown", property: "whitespace", label: "Whitespace" },
          { type: "dropdown", property: "wordBreak", label: "Wordbreak" },
        ],
      },
    ],
  },
  {
    heading: "Background",
    items: [
      { type: "color", label: "Bg. Color", property: "backgroundColor" },
      {
        styleType: "accordion",
        heading: "Position, Size & more",
        items: [
          { type: "dropdown", label: "Attachment", property: "backgroundAttachment" },
          { type: "dropdown", label: "Clipping", property: "backgroundClip" },
          { type: "dropdown", label: "Origin", property: "backgroundOrigin" },
          { type: "dropdown", label: "Position", property: "backgroundPosition" },
          { type: "dropdown", label: "Repeat", property: "backgroundRepeat" },
          { type: "dropdown", label: "Size", property: "backgroundSize" },
        ],
      },
      { type: "dropdown", label: "Gradient", property: "backgroundGradient" },
      {
        styleType: "accordion",
        heading: "Gradient colors",
        items: [
          { type: "color", label: "From", property: "fromColor" },
          { type: "color", label: "Via", property: "viaColor" },
          { type: "color", label: "To", property: "toColor" },
        ],
      },
    ],
  },
  {
    heading: "Border & Outline",
    items: [
      {
        styleType: "multiple",
        type: "dropdown",
        label: "Width",
        options: [
          { key: "border", label: "All" },
          { key: "borderX", label: "Left Right" },
          { key: "borderY", label: "Top bottom" },
          { key: "borderTop", label: "Top" },
          { key: "borderRight", label: "Right" },
          { key: "borderBottom", label: "Bottom" },
          { key: "borderLeft", label: "Left" },
        ],
      },
      {
        styleType: "multiple",
        type: "dropdown",
        label: "Corners",
        options: [
          { key: "borderRadius", label: "All" },
          { key: "borderRadiusTop", label: "Top" },
          { key: "borderRadiusRight", label: "Right" },
          { key: "borderRadiusBottom", label: "Bottom" },
          { key: "borderRadiusLeft", label: "Left" },
          { key: "borderRadiusTopLeft", label: "Top Left" },
          { key: "borderRadiusTopRight", label: "Top right" },
          { key: "borderRadiusBottomRight", label: "Bottom right" },
          { key: "borderRadiusBottomLeft", label: "Bottom left" },
        ],
      },
      { type: "color", label: "Color", property: "borderColor" },
      { type: "dropdown", label: "Style", property: "borderStyle" },
      {
        styleType: "accordion",
        heading: "Divide options",
        items: [
          {
            styleType: "multiple",
            type: "range",
            label: "Width",
            options: [
              { key: "divideXWidth", label: "Left Right" },
              { key: "divideYWidth", label: "Top Bottom" },
            ],
          },
          { type: "color", label: "Color", property: "divideColor" },
          { type: "dropdown", label: "Style", property: "divideStyle" },
        ],
      },
      {
        styleType: "accordion",
        heading: "Outline styling",
        items: [
          { type: "range", label: "Width", property: "outlineWidth" },
          { type: "range", label: "Offset", property: "outlineOffset" },
          { type: "dropdown", label: "Style", property: "outlineStyle" },
        ],
      },
      {
        styleType: "accordion",
        heading: "Ring options",
        items: [
          { type: "range", label: "Width", property: "ringWidth" },
          { type: "color", label: "Color", property: "ringColor" },
          { type: "range", label: "Offset", property: "ringOffsetWidth" },
          { type: "color", label: "Off. color", property: "ringOffsetColor" },
        ],
      },
    ],
  },
  {
    heading: "Effect & Animation",
    items: [
      { type: "range", label: "Shadow", property: "boxShadow" },
      { type: "color", label: "Color", property: "boxShadowColor" },
      { type: "dropdown", label: "Cursor", property: "cursor" },
      {
        styleType: "accordion",
        heading: "Blend & Cursor",
        items: [
          { type: "dropdown", label: "Mix Blend", property: "mixBlendMode" },
          { type: "dropdown", label: "Bg. Blend", property: "bgBlendMode" },
        ],
      },
      {
        styleType: "accordion",
        heading: "Transform",
        items: [
          { type: "dropdown", label: "Origin", property: "transformOrigin" },
          {
            styleType: "multiple",
            label: "Scale",
            units: ["-"],
            options: [
              { key: "scale", label: "All" },
              { key: "scaleX", label: "Left-Right" },
              { key: "scaleY", label: "Top-Bottom" },
            ],
          },
          {
            styleType: "multiple",
            label: "Skew",
            units: ["deg"],
            options: [
              { key: "skewX", label: "Left-Right" },
              { key: "skewY", label: "Top-Bottom" },
            ],
          },
          {
            styleType: "multiple",
            label: "Translate",
            negative: true,
            options: [
              { key: "translateX", label: "Left-Right" },
              { key: "translateY", label: "Top-Bottom" },
            ],
          },
          { type: "arbitrary", units: ["deg"], negative: true, label: "Rotate", property: "rotate" },
        ],
      },
      {
        styleType: "accordion",
        heading: "Animation",
        items: [
          { type: "dropdown", label: "Animation", property: "animation" },
          { type: "dropdown", label: "Transition", property: "transition" },
          { type: "dropdown", label: "Easing", property: "transitionEase" },
          { type: "arbitrary", units: ["ms"], label: "Duration", property: "duration" },
          { type: "arbitrary", units: ["ms"], label: "Delay", property: "delay" },
        ],
      },
    ],
  },
  {
    heading: "Classes",
    items: [{ component: ManualClasses }],
  },
];
