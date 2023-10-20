import { addPrefixToClasses } from "./addPrefixToClasses";

const prefix = "c-";
describe("addPrefixToClasses Function", () => {
  it("should add prefix to all classes", () => {
    const classes = "#styles:bg-red-300,px-4 py-2";
    const expected = "#styles:c-bg-red-300 , c-px-4 c-py-2";
    const result = addPrefixToClasses(classes, prefix);
    expect(result).toEqual(expected);
  });

  it("should handle tailwind css modifiers", () => {
    const classes = "#styles:bg-red-300,px-4 py-2 hover:bg-red-400";
    const expected = "#styles:c-bg-red-300 , c-px-4 c-py-2 hover:c-bg-red-400";
    const result = addPrefixToClasses(classes, prefix);
    expect(result).toEqual(expected);
  });

  it("should handle tailwind css modifiers with multiple classes", () => {
    const classes = "#styles:bg-red-300,px-4 py-2 hover:bg-red-400 hover:text-red-400";
    const expected = "#styles:c-bg-red-300 , c-px-4 c-py-2 hover:c-bg-red-400 hover:c-text-red-400";
    const result = addPrefixToClasses(classes, prefix);
    expect(result).toEqual(expected);
  });

  it("should handle tailwind css modifiers with multiple classes and multiple modifiers", () => {
    const classes =
      "#styles:bg-red-300,px-4 py-2 hover:bg-red-400 hover:text-red-400 focus:bg-red-400 focus:text-red-400";
    const expected =
      "#styles:c-bg-red-300 , c-px-4 c-py-2 hover:c-bg-red-400 hover:c-text-red-400 focus:c-bg-red-400 focus:c-text-red-400";
    const result = addPrefixToClasses(classes, prefix);
    expect(result).toEqual(expected);
  });

  it("should handle dark mode", () => {
    const classes = "#styles:bg-red-300,px-4 py-2 dark:hover:bg-red-400 dark:hover:text-red-400";
    const expected = "#styles:c-bg-red-300 , c-px-4 c-py-2 dark:hover:c-bg-red-400 dark:hover:c-text-red-400";
    const result = addPrefixToClasses(classes, prefix);
    expect(result).toEqual(expected);
  });

  describe("Handling Preline Classes", () => {
    it("should skip classes which contains 'hs-'", () => {
      const classes = "#styles:bg-red-300,px-4 py-2 hs-button-toggle";
      const expected = "#styles:c-bg-red-300 , c-px-4 c-py-2 hs-button-toggle";
      const result = addPrefixToClasses(classes, prefix);
      expect(result).toEqual(expected);
    });

    it("should skip classes which contains '[--'", () => {
      const classes = "#styles:bg-red-300,px-4 py-2 [--trigger:click]";
      const expected = "#styles:c-bg-red-300 , c-px-4 c-py-2 [--trigger:click]";
      const result = addPrefixToClasses(classes, prefix);
      expect(result).toEqual(expected);
    });
  });
});
