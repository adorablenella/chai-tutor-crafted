import {
  AlignCenterHorizontallyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ArrowBottomLeftIcon,
  ArrowBottomRightIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowTopLeftIcon,
  ArrowTopRightIcon,
  ArrowUpIcon,
  BorderAllIcon,
  Cross1Icon,
  Cross2Icon,
  EyeClosedIcon,
  EyeOpenIcon,
  FontItalicIcon,
  HeightIcon,
  LetterCaseUppercaseIcon,
  OverlineIcon,
  StretchHorizontallyIcon,
  UnderlineIcon,
  WidthIcon,
} from "@radix-ui/react-icons";

export const EDITOR_ICONS = {
  "not-italic": () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M9 3H11V5H9V11H11V13H5V11H7V5H5V3H9Z" fill="white" />
    </svg>
  ),
  // visibility
  visible: EyeOpenIcon,
  invisible: EyeClosedIcon,

  // display
  hidden: EyeClosedIcon,

  gap: BorderAllIcon,
  gapX: WidthIcon,
  gapY: HeightIcon,
  spaceX: WidthIcon,
  spaceY: HeightIcon,

  overscroll: BorderAllIcon,
  overscrollX: WidthIcon,
  overscrollY: HeightIcon,
  overflow: BorderAllIcon,
  overflowX: WidthIcon,
  overflowY: HeightIcon,

  top: ArrowUpIcon,
  right: ArrowRightIcon,
  bottom: ArrowDownIcon,
  left: ArrowLeftIcon,

  inset: BorderAllIcon,
  insetX: WidthIcon,
  insetY: HeightIcon,

  border: BorderAllIcon,
  borderX: WidthIcon,
  borderY: HeightIcon,
  borderTop: ArrowUpIcon,
  borderRight: ArrowRightIcon,
  borderBottom: ArrowDownIcon,
  borderLeft: ArrowLeftIcon,

  borderRadius: BorderAllIcon,
  borderRadiusX: WidthIcon,
  borderRadiusY: HeightIcon,
  borderRadiusTop: ArrowUpIcon,
  borderRadiusRight: ArrowRightIcon,
  borderRadiusBottom: ArrowDownIcon,
  borderRadiusLeft: ArrowLeftIcon,
  borderRadiusTopLeft: ArrowTopLeftIcon,
  borderRadiusTopRight: ArrowTopRightIcon,
  borderRadiusBottomRight: ArrowBottomRightIcon,
  borderRadiusBottomLeft: ArrowBottomLeftIcon,

  divideXWidth: WidthIcon,
  divideYWidth: HeightIcon,

  scale: BorderAllIcon,
  scaleX: WidthIcon,
  scaleY: HeightIcon,

  skewX: WidthIcon,
  skewY: HeightIcon,

  translateX: WidthIcon,
  translateY: HeightIcon,

  // padding
  padding: BorderAllIcon,
  paddingX: WidthIcon,
  paddingY: HeightIcon,
  paddingTop: ArrowUpIcon,
  paddingRight: ArrowRightIcon,
  paddingBottom: ArrowDownIcon,
  paddingLeft: ArrowLeftIcon,

  // margin
  margin: BorderAllIcon,
  marginX: WidthIcon,
  marginY: HeightIcon,
  marginTop: ArrowUpIcon,
  marginRight: ArrowRightIcon,
  marginBottom: ArrowDownIcon,
  marginLeft: ArrowLeftIcon,

  // text-align
  textLeft: AlignLeftIcon,
  textCenter: AlignCenterHorizontallyIcon,
  textRight: AlignRightIcon,
  textJustify: StretchHorizontallyIcon,

  // font style
  italic: FontItalicIcon,
  // "not-italic": "",

  // decoration
  underline: UnderlineIcon,
  overline: OverlineIcon,

  // transform
  uppercase: LetterCaseUppercaseIcon,

  block: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.6"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 2H14V14H2V2ZM1 1H15V15H1V1Z"
        fill="currentColor"
      />
      <path fillRule="evenodd" clipRule="evenodd" d="M7 4H4V12H7V4ZM9 4H12V12H9V4Z" fill="currentColor" />
    </svg>
  ),

  // floats
  "float-right": () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 4H16V12H8V4Z" fill="currentColor" />
      <path
        opacity="0.6"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 4H6V6H0V4ZM0 7H6V9H0V7ZM4 10H0V12H4V10Z"
        fill="currentColor"
      />
    </svg>
  ),
  "float-left": () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 4H8V12H0V4Z" fill="currentColor" />
      <path
        opacity="0.6"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 4H16V6H10V4ZM10 7H16V9H10V7ZM14 10H10V12H14V10Z"
        fill="currentColor"
      />
    </svg>
  ),
  "float-none": Cross2Icon,
  // position
  fixed: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.6"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 2H14V4H13V5H14V6H15V2ZM10 5V4H9V2H1V8H2V5H10ZM7 4V3H5V4H7ZM4 4V3H2V4H4ZM1 13H7V14H1V13Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 2H10V3H11V6H12V3H13V2H11ZM2 9H1V12H2V11H7V10H2V9ZM15 7H8V14H15V7Z"
        fill="currentColor"
      />
    </svg>
  ),
  absolute: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.6"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 2H15V6H14V2ZM9 3V2H1V8H2V3H9ZM7 13H1V14H7V13Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 2H10V3H11V6H12V3H13V2H11ZM2 9H1V12H2V11H7V10H2V9ZM15 7H8V14H15V7Z"
        fill="currentColor"
      />
    </svg>
  ),
  relative: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 2H9V3H11V6H12V3H14V2H11ZM2 8H1V13H2V11H7V10H2V8ZM15 7H8V14H15V7Z"
        fill="currentColor"
      />
    </svg>
  ),
  sticky: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.9998 7C13.6558 7 14.2937 6.78498 14.8158 6.38787C15.338 5.99076 15.7156 5.43345 15.8908 4.80128C16.066 4.16912 16.0292 3.49694 15.7859 2.8877C15.5427 2.27846 15.1065 1.76573 14.5441 1.42804C13.9817 1.09034 13.3241 0.946293 12.672 1.01795C12.02 1.08961 11.4094 1.37303 10.9337 1.8248C10.4581 2.27658 10.1436 2.8718 10.0385 3.51932C9.93341 4.16685 10.0434 4.83097 10.3518 5.41L6.88176 8.88C6.80034 8.96122 6.73572 9.05769 6.69158 9.16388C6.64744 9.27008 6.62465 9.38393 6.62451 9.49894C6.62437 9.61395 6.64689 9.72785 6.69077 9.83416C6.73465 9.94046 6.79904 10.0371 6.88026 10.1185C6.96149 10.1999 7.05795 10.2645 7.16415 10.3087C7.27035 10.3528 7.3842 10.3756 7.4992 10.3758C7.61421 10.3759 7.72812 10.3534 7.83442 10.3095C7.94072 10.2656 8.03734 10.2012 8.11876 10.12L11.5888 6.648C12.0088 6.873 12.4888 7 12.9988 7H12.9998Z"
        fill="currentColor"
      />
      <path
        opacity="0.6"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.535 2H1V14H15V7.465C14.69 7.645 14.355 7.783 14 7.875V13H2V5H9.126C8.86504 3.98486 9.01223 2.90789 9.536 2H9.535ZM7 3V4H5V3H7ZM4 3V4H2V3H4Z"
        fill="currentColor"
      />
    </svg>
  ),
  static: Cross1Icon,
};
