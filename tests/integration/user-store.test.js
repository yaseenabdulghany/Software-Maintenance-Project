const userStore = require("../../src/services/user-store");

describe("integration tests for the user workflow", () => {
  beforeEach(() => {
    userStore.resetUsers();
  });

  test("adds a user and then updates the same user", () => {
    const createdUser = userStore.addUser({
      name: "nour",
      email: "nour@example.com"
    });

    userStore.addUser({
      name: "ali",
      email: "ali@example.com"
    });

    const updatedUser = userStore.updateUser(createdUser.id, {
      name: "nour ali",
      email: "nour@example.com"
    });

    expect(createdUser).toEqual({
      id: 1,
      name: "nour",
      email: "nour@example.com"
    });
    expect(userStore.findUserById(createdUser.id)).toEqual(updatedUser);
    expect(updatedUser.name).toBe("nour ali");
  });

  test("throws an error when required data is missing", () => {
    expect(() => userStore.addUser({ name: "" })).toThrow("name and email are required");
  });
});
