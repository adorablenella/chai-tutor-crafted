import { intersection } from "lodash";
import { getBgImageValue } from "./functions";

test("get background image css property value", () => {
  expect(getBgImageValue("")).toBe("");
  expect(getBgImageValue("https://picsum.photos/300")).toBe("url('https://picsum.photos/300')");
  expect(getBgImageValue("linear-gradient(red, yellow);")).toBe("linear-gradient(red, yellow)");
});

const getBlockGroups = (fullList: string[], fromDb: string[]) => ["Global", ...intersection(fromDb, fullList)];

test("merge block groups in order", () => {
  const groups: string[] = [
    "Global",
    "layouts",
    "navigation",
    "hero",
    "content",
    "features",
    "forms",
    "blog",
    "pricing",
    "stats",
    "steps",
    "faq",
    "team",
    "testimonials",
    "call_to_action",
    "footers",
  ];
  const fromDb = ["navigation", "footers"];
  expect(getBlockGroups(groups, fromDb)).toEqual(["Global", "navigation", "footers"]);
});
