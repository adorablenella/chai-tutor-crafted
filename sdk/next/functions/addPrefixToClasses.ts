import { STYLES_KEY } from "@/sdk/package/constants/CONTROLS";
import { includes, last } from "lodash";

export const addPrefixToClasses = (classes: string, prefix: string = "c-") => {
  const classesArray = classes.replace(STYLES_KEY, "").split(",");
  const array = classesArray.map((item) => {
    const classes = item.split(" ");
    const newClasses = classes.map((item) => {
      if (item === "") return "";
      if (includes(item, "hs-") || includes(item, "[--")) return item;
      // if the class had a state of media query, then prefix the classes
      // eg: dark:hover:bg-red-500 => dark:hover:c-bg-red-500
      // eg: hover:bg-red-500 => hover:c-bg-red-500
      if (item.includes(":")) {
        const values = item.split(":");
        // replace the last value from values with prefixedClass
        values[values.length - 1] = prefix + last(values);
        return values.join(":");
      }
      return `${prefix}${item}`;
    });
    return newClasses.join(" ");
  });
  return `${STYLES_KEY}${array.join(" , ")}`;
};
