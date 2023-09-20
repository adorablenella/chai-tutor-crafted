import { sanitizeClasses } from "./SanitizeClasses";

describe("Sanitize classes string", () => {
  test("sanitizeClasses", () => {
    expect(sanitizeClasses("")).toBe("");
    expect(sanitizeClasses("flex")).toBe("flex");
    expect(sanitizeClasses("flex xl:block")).toBe("flex xl:block");
    expect(sanitizeClasses("flex sm:block")).toBe("flex sm:block");
    expect(sanitizeClasses("flex sm:flex")).toBe("flex");
    expect(sanitizeClasses("flex sm:flex md:flex")).toBe("flex");
    expect(sanitizeClasses("flex sm:block md:flex")).toBe("flex sm:block md:flex");
    expect(sanitizeClasses("flex sm:block md:flex 2xl:flex")).toBe("flex sm:block md:flex");
    expect(sanitizeClasses("flex 2xl:flex")).toBe("flex");
    expect(sanitizeClasses("w-1/2 xl:w-full")).toBe("w-1/2 xl:w-full");
    expect(sanitizeClasses("w-1/2 lg:w-full xl:w-full")).toBe("w-1/2 lg:w-full");
    expect(sanitizeClasses("w-1/2 lg:flex xl:w-1/2")).toBe("w-1/2 lg:flex");
    // extra spaces
    expect(sanitizeClasses("w-1/2  lg:flex xl:w-1/2")).toBe("w-1/2 lg:flex");
  });
});
