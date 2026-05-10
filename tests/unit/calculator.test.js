const { add, divide } = require("../../src/utils/calculator");

describe("calculator utilities", () => {
  test("adds two numbers", () => {
    expect(add(4, 6)).toBe(10);
  });

  test("divides two numbers", () => {
    expect(divide(12, 3)).toBe(4);
  });

  test("throws an error for invalid input", () => {
    expect(() => add("4", 6)).toThrow("both values must be numbers");
    expect(() => divide(12, 0)).toThrow("cannot divide by zero");
    expect(() => divide(12, "3")).toThrow("both values must be numbers");
  });
});
