import numberCompare from "../numberCompare";

describe("numberCompare", () => {
  it("should return 0 when either a or b is undefined", () => {
    expect(numberCompare(undefined, 5)).toBe(0);
    expect(numberCompare(10, undefined)).toBe(0);
    expect(numberCompare(undefined, undefined)).toBe(0);
  });

  it("should return the difference between a and b when isAsc is true", () => {
    expect(numberCompare(5, 3)).toBe(2);
    expect(numberCompare(10, 20)).toBe(-10);
    expect(numberCompare(0, 0)).toBe(0);
  });

  it("should return the difference between b and a when isAsc is false", () => {
    expect(numberCompare(5, 3, false)).toBe(-2);
    expect(numberCompare(10, 20, false)).toBe(10);
    expect(numberCompare(0, 0, false)).toBe(0);
  });
});
