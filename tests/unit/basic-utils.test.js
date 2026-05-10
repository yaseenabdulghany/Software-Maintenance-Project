const {
  formatName,
  getEvenNumbers,
  hasRequiredUserFields
} = require("../../src/utils/basic-utils");

describe("basic unit examples", () => {
  test("formats a string name", () => {
    expect(formatName("  YAseen  ")).toBe("yaseen");
  });

  test("throws an error when the name is not a string", () => {
    expect(() => formatName(10)).toThrow("name must be a string");
  });

  test("returns even numbers from an array", () => {
    expect(getEvenNumbers([1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);
  });

  test("throws an error when the input is not an array", () => {
    expect(() => getEvenNumbers("123")).toThrow("input must be an array");
  });

  test("checks that an object has name and email", () => {
    expect(hasRequiredUserFields({
      name: "ali",
      email: "ali@example.com"
    })).toBe(true);

    expect(hasRequiredUserFields({
      name: "ali"
    })).toBe(false);
  });

  test("throws an error when the user value is not an object", () => {
    expect(() => hasRequiredUserFields(null)).toThrow("user must be an object");
    expect(() => hasRequiredUserFields([])).toThrow("user must be an object");
  });
});
