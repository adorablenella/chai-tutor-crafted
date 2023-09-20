import { getUserInputValues } from "./GetUserInputValues";

describe("Validate and format user input value", () => {
  test("should return correct values for allowed units", () => {
    const allowedUnits = ["px", "%", "rem", "em", "ch", "vw", "vh", "auto"];
    expect(getUserInputValues("", allowedUnits)).toEqual({ value: "", unit: "" });
    expect(getUserInputValues(" ", allowedUnits)).toEqual({ value: "", unit: "" });
    expect(getUserInputValues("10", allowedUnits)).toEqual({ value: "10", unit: "" });
    expect(getUserInputValues("10px", allowedUnits)).toEqual({ value: "10", unit: "px" });
    expect(getUserInputValues("10PX", allowedUnits)).toEqual({ value: "10", unit: "px" });
    expect(getUserInputValues("10   px", allowedUnits)).toEqual({ value: "10", unit: "px" });
    expect(getUserInputValues("10%", allowedUnits)).toEqual({ value: "10", unit: "%" });
    expect(getUserInputValues("1rem", allowedUnits)).toEqual({ value: "1", unit: "rem" });
    expect(getUserInputValues("1em", allowedUnits)).toEqual({ value: "1", unit: "em" });
    expect(getUserInputValues("1ch", allowedUnits)).toEqual({ value: "1", unit: "ch" });
    expect(getUserInputValues("1vw", allowedUnits)).toEqual({ value: "1", unit: "vw" });
    expect(getUserInputValues("1vh", allowedUnits)).toEqual({ value: "1", unit: "vh" });
    expect(getUserInputValues("1vh", allowedUnits)).toEqual({ value: "1", unit: "vh" });
    expect(getUserInputValues("auto", allowedUnits)).toEqual({ value: "", unit: "auto" });
    expect(getUserInputValues("1empx", allowedUnits)).toEqual({ error: "Invalid value" });

    expect(getUserInputValues("we", allowedUnits)).toEqual({ error: "Invalid value" });
  });

  test("for auto value", () => {
    const allowedUnits = ["auto"];
    expect(getUserInputValues("", allowedUnits)).toEqual({ value: "", unit: "" });
    expect(getUserInputValues("20", allowedUnits)).toEqual({ value: "20", unit: "" });
    expect(getUserInputValues("10px", allowedUnits)).toEqual({ error: "Invalid value" });
    expect(getUserInputValues("none", allowedUnits)).toEqual({ error: "Invalid value" });
    expect(getUserInputValues("10%", allowedUnits)).toEqual({ error: "Invalid value" });
  });

  test("for none value", () => {
    const allowedUnits = ["px", "none"];
    expect(getUserInputValues("", allowedUnits)).toEqual({ value: "", unit: "" });
    expect(getUserInputValues("20", allowedUnits)).toEqual({ value: "20", unit: "" });
    expect(getUserInputValues("none", allowedUnits)).toEqual({ value: "", unit: "none" });
    expect(getUserInputValues("NONE", allowedUnits)).toEqual({ value: "", unit: "none" });
    expect(getUserInputValues("10%", allowedUnits)).toEqual({ error: "Invalid value" });
  });

  test("for only numbers", () => {
    const allowedUnits: string[] = [];
    expect(getUserInputValues("20", allowedUnits)).toEqual({ value: "20", unit: "" });
    expect(getUserInputValues("none", allowedUnits)).toEqual({ error: "Invalid value" });
  });

  test("for -ve numbers", () => {
    const allowedUnits: string[] = [];
    expect(getUserInputValues("-20", allowedUnits)).toEqual({ value: "-20", unit: "" });
    expect(getUserInputValues("20", allowedUnits)).toEqual({ value: "20", unit: "" });
  });

  test("for float numbers", () => {
    const allowedUnits: string[] = ["rem"];
    expect(getUserInputValues(".20rem", allowedUnits)).toEqual({ value: ".20", unit: "rem" });
  });
});
