import getHourMinutes from "../getHourMinutes"; // replace 'your-file' with the actual path to your file

describe("getHourMinutes function", () => {
  it("should convert minutes to hours and minutes", () => {
    expect(getHourMinutes(90)).toBe("1h 30m");
    expect(getHourMinutes(60)).toBe("1h 0m");
    expect(getHourMinutes(150)).toBe("2h 30m");
    expect(getHourMinutes(11)).toBe("0h 11m");
    expect(getHourMinutes(78)).toBe("1h 18m");
    expect(getHourMinutes(1439)).toBe("23h 59m");
    expect(getHourMinutes(1888)).toBe("31h 28m");
  });

  it("should handle edge cases", () => {
    expect(getHourMinutes(null)).toBe("0h 0m");
    expect(getHourMinutes(undefined)).toBe("0h 0m");
    expect(getHourMinutes(NaN)).toBe("0h 0m");
    expect(getHourMinutes(0)).toBe("0h 0m");
    expect(getHourMinutes(-30)).toBe("0h 0m");
  });

  it("should handle extremely cases", () => {
    expect(getHourMinutes(Number.MAX_SAFE_INTEGER)).toBe("150119987579016h 31m");
    expect(getHourMinutes(Number.MIN_SAFE_INTEGER)).toBe("0h 0m");
  });
});
