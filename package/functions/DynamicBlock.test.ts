import { intersection, map, uniq } from "lodash";
import { BlockNode } from "./Layers";

const getDynamicBlocks = (hierarchy: BlockNode[]) => uniq(intersection(map(hierarchy, "type"), ["Menu", "Disclosure"]));

describe("get dynamic blocks", () => {
  it("should return correct blocks", () => {
    expect(getDynamicBlocks([])).toEqual([]);
    expect(getDynamicBlocks([{ type: "Box" }, { type: "Menu" }] as BlockNode[])).toEqual(["Menu"]);
    expect(getDynamicBlocks([{ type: "Box" }, { type: "Menu" }, { type: "Disclosure" }] as BlockNode[])).toEqual([
      "Menu",
      "Disclosure",
    ]);
  });
});
