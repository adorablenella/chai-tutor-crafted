import { insertBlockAtIndex } from "@/sdk/package/functions/InsertBlockAtIndex";

describe("InsertBlockAtPos", () => {
  it("should add the block at correct index", () => {
    // @ts-ignore
    let blocks = insertBlockAtIndex([], null, 0, [{ _id: "1" }]);
    expect(blocks).toEqual([{ _id: "1" }]);
    // @ts-ignore
    blocks = insertBlockAtIndex(blocks, null, 0, [{ _id: "2" }]);
    expect(blocks).toEqual([{ _id: "2" }, { _id: "1" }]);
  });

  it("should add multiple blocks at correct index", () => {
    // @ts-ignore
    let blocks = insertBlockAtIndex([], null, 0, [{ _id: "1" }, { _id: "2" }]);
    expect(blocks).toEqual([{ _id: "1" }, { _id: "2" }]);
    // @ts-ignore
    blocks = insertBlockAtIndex(blocks, null, 1, [{ _id: "3" }]);
    expect(blocks).toEqual([{ _id: "1" }, { _id: "3" }, { _id: "2" }]);
  });
});
