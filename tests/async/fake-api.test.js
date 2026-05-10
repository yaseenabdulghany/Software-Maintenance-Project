const {
  fetchMessage,
  loadMessage
} = require("../../src/services/fake-api");

describe("async services", () => {
  test("resolves a promise with data", async () => {
    await expect(fetchMessage()).resolves.toEqual({
      message: "data loaded successfully"
    });
  });

  test("rejects when the request fails", async () => {
    await expect(fetchMessage(true)).rejects.toThrow("request failed");
  });

  test("loads the message text with async await", async () => {
    await expect(loadMessage()).resolves.toBe("data loaded successfully");
  });
});