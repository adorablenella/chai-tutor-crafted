import { each } from "lodash";
import { getModForCls, getMqForCls, getPropertyForClass, getPureClsName } from "./Class";
import { CLASSES_LIST } from "../constants/CLASSES_LIST";
import { convertArbitraryToTw } from "./ConvertArbitraryToTw";

describe("Class functions", () => {
  test.skip("convertArbitraryToTw", () => {
    expect(convertArbitraryToTw("")).toBe("");

    expect(convertArbitraryToTw("space-x-[4px]")).toBe("space-x-1");

    // * PERCENTAGE VALUE TEST FOR [w/h]
    // expect(convertArbitraryToTw("w-[50%]")).toBe("w-1/2");
    // expect(convertArbitraryToTw("h-[100%]")).toBe("h-full");
    // expect(convertArbitraryToTw("w-[25%]")).toBe("w-1/4");
    // expect(convertArbitraryToTw("p-[20px]")).toBe("p-5");
    // expect(convertArbitraryToTw("hover:h-[20%]")).toBe("hover:h-1/5");
    // expect(convertArbitraryToTw("before:w-[75%]")).toBe("before:w-3/4");
    // expect(convertArbitraryToTw("after:w-[40%]")).toBe("after:w-2/5");
    // expect(convertArbitraryToTw("first:w-[33.33%]")).toBe("first:w-1/3");
    // expect(convertArbitraryToTw("last:w-[66.67%]")).toBe("last:w-2/3");

    // * PIXEL VALUE TEST FOR  [w/h/p/m]
    // expect(convertArbitraryToTw("w-[384px]")).toBe("w-96");
    // expect(convertArbitraryToTw("h-[240px]")).toBe("h-60");
    //
    // expect(convertArbitraryToTw("p-[208px]")).toBe("p-52");
    // expect(convertArbitraryToTw("pl-[192px]")).toBe("pl-48");
    // expect(convertArbitraryToTw("pr-[176px]")).toBe("pr-44");
    // expect(convertArbitraryToTw("pt-[160px]")).toBe("pt-40");
    // expect(convertArbitraryToTw("pb-[128px]")).toBe("pb-32");
    // expect(convertArbitraryToTw("px-[128px]")).toBe("px-32");
    // expect(convertArbitraryToTw("py-[128px]")).toBe("py-32");
    // expect(convertArbitraryToTw("hover:p-[64px]")).toBe("hover:p-16");
    // expect(convertArbitraryToTw("disabled:p-[1px]")).toBe("disabled:p-px");
    // expect(convertArbitraryToTw("first-line:p-[0px]")).toBe("first-line:p-0");
    //
    // expect(convertArbitraryToTw("m-[2px]")).toBe("m-0.5");
    // expect(convertArbitraryToTw("ml-[0px]")).toBe("ml-0");
    // expect(convertArbitraryToTw("mr-[1px]")).toBe("mr-px");
    // expect(convertArbitraryToTw("mt-[4px]")).toBe("mt-1");
    // expect(convertArbitraryToTw("mb-[10px]")).toBe("mb-2.5");
    // expect(convertArbitraryToTw("mx-[16px]")).toBe("mx-4");
    // expect(convertArbitraryToTw("my-[40px]")).toBe("my-10");
    // expect(convertArbitraryToTw("active:m-[64px]")).toBe("active:m-16");
    // expect(convertArbitraryToTw("first-letter:m-[320px]")).toBe("first-letter:m-80");
    //
    // expect(convertArbitraryToTw("max-h-[14px]")).toBe("max-h-3.5");
    // expect(convertArbitraryToTw("max-h-[208px]")).toBe("max-h-52");
    // expect(convertArbitraryToTw("focus:max-h-[64px]")).toBe("focus:max-h-16");
    //
    // // * REM VALUE TEST FOR  [w/h/p/m]
    // expect(convertArbitraryToTw("w-[0.125rem]")).toBe("w-0.5");
    // expect(convertArbitraryToTw("h-[0.25rem]")).toBe("h-1");
    //
    // expect(convertArbitraryToTw("p-[0.5rem]")).toBe("p-2");
    // expect(convertArbitraryToTw("pl-[0.625rem]")).toBe("pl-2.5");
    // expect(convertArbitraryToTw("pr-[1.5rem]")).toBe("pr-6");
    // expect(convertArbitraryToTw("pt-[1.75rem]")).toBe("pt-7");
    // expect(convertArbitraryToTw("pb-[0.875rem]")).toBe("pb-3.5");
    // expect(convertArbitraryToTw("px-[20rem]")).toBe("px-80");
    // expect(convertArbitraryToTw("py-[24rem]")).toBe("py-96");
    // expect(convertArbitraryToTw("hover:p-[11rem]")).toBe("hover:p-44");
    // expect(convertArbitraryToTw("disabled:p-[12rem]")).toBe("disabled:p-48");
    // expect(convertArbitraryToTw("first-line:p-[14rem]")).toBe("first-line:p-56");
    //
    // expect(convertArbitraryToTw("m-[10rem]")).toBe("m-40");
    // expect(convertArbitraryToTw("ml-[9rem]")).toBe("ml-36");
    // expect(convertArbitraryToTw("mr-[8rem]")).toBe("mr-32");
    // expect(convertArbitraryToTw("mt-[7rem]")).toBe("mt-28");
    // expect(convertArbitraryToTw("mb-[6rem]")).toBe("mb-24");
    // expect(convertArbitraryToTw("mx-[5rem]")).toBe("mx-20");
    // expect(convertArbitraryToTw("my-[4rem]")).toBe("my-16");
    // expect(convertArbitraryToTw("active:m-[3rem]")).toBe("active:m-12");
    // expect(convertArbitraryToTw("first-letter:m-[2rem]")).toBe("first-letter:m-8");
    //
    // expect(convertArbitraryToTw("max-h-[10rem]")).toBe("max-h-40");
    // expect(convertArbitraryToTw("max-h-[0.5rem]")).toBe("max-h-2");
    // expect(convertArbitraryToTw("focus:max-h-[0.25rem]")).toBe("focus:max-h-1");

    // * TEST FOR MAX-WIDTH
    // expect(convertArbitraryToTw("max-w-[0rem]")).toBe("max-w-0");
    // expect(convertArbitraryToTw("max-w-[20rem]")).toBe("max-w-xs");
    // expect(convertArbitraryToTw("max-w-[42rem]")).toBe("max-w-2xl");
    // expect(convertArbitraryToTw("max-w-[1280px]")).toBe("max-w-7xl");
    // expect(convertArbitraryToTw("max-w-[1024px]")).toBe("max-w-5xl");
    // expect(convertArbitraryToTw("max-w-[512px]")).toBe("max-w-lg");
    // expect(convertArbitraryToTw("max-w-[100%]")).toBe("max-w-full");
    // expect(convertArbitraryToTw("hover:max-w-[512px]")).toBe("hover:max-w-lg");
    // expect(convertArbitraryToTw("first-letter:max-w-[320px]")).toBe("first-letter:max-w-xs");
  });

  test("getMqForClass", () => {
    expect(getMqForCls("")).toEqual("");
    expect(getMqForCls("flex")).toEqual("xs");
    expect(getMqForCls("sm:flex")).toEqual("sm");
    expect(getMqForCls("sm:hover:flex")).toEqual("sm");
    expect(getMqForCls("dark:2xl:flex")).toEqual("2xl");
  });

  test("getModForClass", () => {
    expect(getModForCls("")).toEqual("");
    expect(getModForCls("flex")).toEqual("");
    expect(getModForCls("hover:flex")).toEqual("hover");
    expect(getModForCls("in-range:flex")).toEqual("in-range");
  });

  test("getPureClsName", () => {
    expect(getPureClsName("")).toEqual("");
    expect(getPureClsName("flex")).toEqual("flex");
    expect(getPureClsName("sm:flex")).toEqual("flex");
    expect(getPureClsName("dark:sm:flex")).toEqual("flex");
    expect(getPureClsName("dark:sm:hover:flex ")).toEqual("flex");
  });

  test("getPropertyForClass", () => {
    expect(getPropertyForClass("rounded-lg")).toBe("borderRadius");
    // check for all available classes
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in CLASSES_LIST) {
      each(CLASSES_LIST[key].classes, (pureCls: string) => {
        expect(getPropertyForClass(pureCls)).toBe(key);
      });
    }

    // //colors
    expect(getPropertyForClass("text-red-500")).toEqual("textColor");
    expect(getPropertyForClass("from-red-500")).toEqual("fromColor");
    expect(getPropertyForClass("via-red-500")).toEqual("viaColor");
    expect(getPropertyForClass("leading-[2px]")).toEqual("lineHeight");
  });
});
