import { getClassValueAndUnit, getMinWidthTwClassValue, getTwClassValue, getValueAndUnitForTWClass } from "./Helpers";

describe("getClassValueAndUnit", () => {
  test("should return", () => {
    expect(getClassValueAndUnit("")).toEqual({ value: "", unit: "" });
    expect(getClassValueAndUnit("w-[33px]")).toEqual({ value: "33", unit: "px" });
    expect(getClassValueAndUnit("w-[25%]")).toEqual({ value: "25", unit: "%" });
    expect(getClassValueAndUnit("w-[25.33%]")).toEqual({ value: "25.33", unit: "%" });
    expect(getClassValueAndUnit("w-[25vh]")).toEqual({ value: "25", unit: "vh" });
    expect(getClassValueAndUnit("w-[25vw]")).toEqual({ value: "25", unit: "vw" });
    expect(getClassValueAndUnit("w-[25em]")).toEqual({ value: "25", unit: "em" });
    expect(getClassValueAndUnit("w-[25rem]")).toEqual({ value: "25", unit: "rem" });
    expect(getClassValueAndUnit("w-20")).toEqual({ value: "80", unit: "px" });
    expect(getClassValueAndUnit("-m-20")).toEqual({ value: "-80", unit: "px" });
    expect(getClassValueAndUnit("-m-[20px]")).toEqual({ value: "-20", unit: "px" });
  });
});

describe("Get width tailwind values", () => {
  test("should return", () => {
    expect(getTwClassValue("w-0")).toEqual({ value: "0", unit: "px" });
    expect(getTwClassValue("w-px")).toEqual({ value: "1", unit: "px" });
    expect(getTwClassValue("w-1")).toEqual({ value: "4", unit: "px" });
    expect(getTwClassValue("w-1.5")).toEqual({ value: "6", unit: "px" });
    expect(getTwClassValue("w-60")).toEqual({ value: "240", unit: "px" });
    expect(getTwClassValue("w-screen")).toEqual({ value: "100", unit: "vw" });
    expect(getTwClassValue("w-full")).toEqual({ value: "100", unit: "%" });
    expect(getTwClassValue("w-min")).toEqual({ value: "w-min", unit: "class" });
    expect(getTwClassValue("w-fit")).toEqual({ value: "w-fit", unit: "class" });
    expect(getTwClassValue("w-auto")).toEqual({ value: "", unit: "auto" });
    expect(getTwClassValue("w-1/2")).toEqual({ value: "50", unit: "%" });
    expect(getTwClassValue("w-1/3")).toEqual({ value: "33.33", unit: "%" });
    expect(getTwClassValue("w-2/3")).toEqual({ value: "66.67", unit: "%" });
  });
});

describe("Get height tailwind values", () => {
  test("should return", () => {
    expect(getTwClassValue("h-0")).toEqual({ value: "0", unit: "px" });
    expect(getTwClassValue("h-px")).toEqual({ value: "1", unit: "px" });
    expect(getTwClassValue("h-1")).toEqual({ value: "4", unit: "px" });
    expect(getTwClassValue("h-1.5")).toEqual({ value: "6", unit: "px" });
    expect(getTwClassValue("h-60")).toEqual({ value: "240", unit: "px" });
    expect(getTwClassValue("h-screen")).toEqual({ value: "100", unit: "vh" });
    expect(getTwClassValue("h-full")).toEqual({ value: "100", unit: "%" });
    expect(getTwClassValue("h-min")).toEqual({ value: "h-min", unit: "class" });
    expect(getTwClassValue("h-fit")).toEqual({ value: "h-fit", unit: "class" });
    expect(getTwClassValue("h-auto")).toEqual({ value: "", unit: "auto" });
    expect(getTwClassValue("h-1/2")).toEqual({ value: "50", unit: "%" });
    expect(getTwClassValue("h-1/3")).toEqual({ value: "33.33", unit: "%" });
    expect(getTwClassValue("h-2/3")).toEqual({ value: "66.67", unit: "%" });
    expect(getTwClassValue("translate-x-1/2")).toEqual({ value: "50", unit: "%" });
    expect(getTwClassValue("translate-x-1.5")).toEqual({ value: "0.375", unit: "rem" });
    expect(getTwClassValue("-translate-x-1.5")).toEqual({ value: "-0.375", unit: "rem" });
    expect(getTwClassValue("-skew-x-3")).toEqual({ value: "-3", unit: "deg" });
    expect(getTwClassValue("skew-x-12")).toEqual({ value: "12", unit: "deg" });
    expect(getTwClassValue("scale-x-150")).toEqual({ value: "1.5", unit: "-" });
    expect(getTwClassValue("-scale-x-150")).toEqual({ value: "-1.5", unit: "-" });
    expect(getTwClassValue("duration-75")).toEqual({ value: "75", unit: "ms" });
  });
});

describe("Get min width tailwind values", () => {
  test("should return", () => {
    expect(getMinWidthTwClassValue("min-w-0")).toEqual({ value: "0", unit: "px" });
    expect(getMinWidthTwClassValue("min-w-full")).toEqual({ value: "100", unit: "%" });
  });
});

describe("get Value And Unit For Tw Class", () => {
  test("should return", () => {
    expect(getValueAndUnitForTWClass("")).toEqual({ value: "", unit: "" });
    expect(getValueAndUnitForTWClass("w-20")).toEqual({ value: "80", unit: "px" });
  });
});

describe("get negative values", () => {
  test("should return", () => {
    expect(getValueAndUnitForTWClass("-m-10")).toEqual({ value: "-40", unit: "px" });
  });
});

describe("get border values", () => {
  test("should return", () => {
    expect(getValueAndUnitForTWClass("border-0")).toEqual({ value: "0", unit: "px" });
    expect(getValueAndUnitForTWClass("border-8")).toEqual({ value: "8", unit: "px" });
  });
});
