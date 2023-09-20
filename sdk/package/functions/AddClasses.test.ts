import { map } from "lodash";
import { ClassDerivedObject, constructClassObject } from "./Class";
import { getBelongsToForClass } from "./GetNewClasses";

test("getBelongsToForClass", () => {
  const createObj = (classes: string[]) => map(classes, constructClassObject) as ClassDerivedObject[];

  expect(getBelongsToForClass([], constructClassObject(""))).toBe("baseClasses");
  expect(getBelongsToForClass([], constructClassObject("xl:flex"))).toBe("baseClasses");
  expect(getBelongsToForClass([], constructClassObject("flex"))).toBe("classes");
  expect(getBelongsToForClass(createObj(["block"]), constructClassObject("lg:flex"))).toBe("classes");
  expect(getBelongsToForClass(createObj(["block"]), constructClassObject("lg:bg-red-500"))).toBe("baseClasses");
  expect(getBelongsToForClass(createObj(["block"]), constructClassObject("lg:bg-red-500"))).toBe("baseClasses");
});
