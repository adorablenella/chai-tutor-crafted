import { canDropBlock } from "./Layers";

describe("canDropBlock Function", () => {
  it('should return false if dragSourceType is "Slot"', () => {
    const dragSource = { data: { _type: "Slot" } };
    const dropTarget = { data: {} };
    expect(canDropBlock({}, { dragSource, dropTarget })).toBe(false);
  });

  it("should return true if dropTargetType is empty", () => {
    const dragSource = { data: { _type: "SomeType" } };
    const dropTarget = { data: {} };
    expect(canDropBlock({}, { dragSource, dropTarget })).toBe(true);
  });
});
