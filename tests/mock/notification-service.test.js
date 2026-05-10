jest.mock("../../src/services/email-service", () => ({
  sendWelcomeEmail: jest.fn()
}));

const { sendWelcomeEmail } = require("../../src/services/email-service");
const { notifyNewUser } = require("../../src/services/notification-service");

describe("module mocking with jest.mock()", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("uses the mocked email service", async () => {
    sendWelcomeEmail.mockResolvedValue("welcome learner");

    const result = await notifyNewUser({
      name: "learner",
      email: "learner@example.com"
    });

    expect(sendWelcomeEmail).toHaveBeenCalledWith({
      name: "learner",
      email: "learner@example.com"
    });
    expect(result).toEqual({
      sent: true,
      message: "welcome learner"
    });
  });

  test("throws when user data is missing", async () => {
    await expect(notifyNewUser({})).rejects.toThrow("user name and email are required");
  });
});
