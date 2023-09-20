import { convertArbitraryToTw } from "./ConvertArbitraryToTw";
import { gap, nonArbitraryClasses, opacity, padding, position, zIndex } from "./ArbitraryClassesMock";

describe("ConvertArbitraryToTw", () => {
  const MAPPER: { [key: string]: string } = {
    ...nonArbitraryClasses,
    ...zIndex,
    ...position,
    ...opacity,
    ...gap,
    ...padding,
    "m-[40px]": "m-10",
    "-m-[28px]": "-m-7",
    "m-[100%]": "m-full",
    "basis-[40px]": "basis-10",
    "w-[40px]": "w-10",
    "w-[100%]": "w-full",
    "w-[100vw]": "w-screen",
    "min-w-[100%]": "min-w-full",
    "min-w-[0px]": "min-w-0",

    "max-w-[0px]": "max-w-0",
    "max-w-[320px]": "max-w-xs",
    "max-w-[384px]": "max-w-sm",
    "max-w-[28rem]": "max-w-md",
    "max-w-[100%]": "max-w-full",
    "max-w-[65ch]": "max-w-prose",
    "max-w-[1536px]": "max-w-screen-2xl",

    "h-[40px]": "h-10",
    "h-[100%]": "h-full",
    "h-[100vh]": "h-screen",

    "min-h-[100%]": "min-h-full",
    "min-h-[0px]": "min-h-0",
    "min-h-[100vh]": "min-h-screen",
    "max-h-[100%]": "max-h-full",
    "max-h-[100vh]": "max-h-screen",

    "text-[12px]": "text-xs",
    "text-[0.875rem]": "text-sm",
    "text-[16px]": "text-base",
    "text-[8rem]": "text-9xl",

    "leading-[1]": "leading-none",
    "leading-[2]": "leading-loose",
    "leading-[2.5rem]": "leading-10",

    "indent-[40px]": "indent-10",
    "space-x-[24px]": "space-x-6",
    "space-y-[24px]": "space-y-6",
  };

  it("should return the correct tw class value", () => {
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const cls in MAPPER) {
      const expected: string = MAPPER[cls];
      expect(convertArbitraryToTw(cls)).toBe(expected);
    }
  });
});
