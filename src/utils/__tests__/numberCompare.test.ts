import numberCompare from "../numberCompare";

describe("numberCompare", () => {
  it("should return 0 when either a or b is undefined", () => {
    expect(numberCompare(undefined, 5)).toBe(0);
    expect(numberCompare(10, undefined)).toBe(0);
    expect(numberCompare(undefined, undefined)).toBe(0);
  });

  it("Is ASC by default and should return a - b", () => {
    expect(numberCompare(5, 3)).toBe(2);
    expect(numberCompare(5, 0)).toBe(5);
    expect(numberCompare(0, 5)).toBe(-5);
    expect(numberCompare(10, 20)).toBe(-10);
    expect(numberCompare(0, 0)).toBe(0);
    expect(numberCompare(-1, 0)).toBe(-1);
    expect(numberCompare(-1, -1)).toBe(0);
    expect(numberCompare(-1.22, -1.22)).toBe(0);
  });

  it("When second param is false should be DESC and return b - a", () => {
    expect(numberCompare(5, 3, false)).toBe(-2);
    expect(numberCompare(5, 0, false)).toBe(-5);
    expect(numberCompare(0, 5, false)).toBe(5);
    expect(numberCompare(10, 20, false)).toBe(10);
    expect(numberCompare(0, 0, false)).toBe(0);
    expect(numberCompare(-1, -2, false)).toBe(-1);
  });

  it("should handle extreme cases", () => {
    expect(numberCompare(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER - 1)).toBe(1);
    expect(numberCompare(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER + 1)).toBe(-1);
    expect(numberCompare(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER - 1, false)).toBe(-1);
    expect(numberCompare(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER + 1, false)).toBe(1);
  });
});
