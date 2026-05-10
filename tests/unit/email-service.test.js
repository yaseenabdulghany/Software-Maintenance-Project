const { sendWelcomeEmail } = require("../../src/services/email-service");

describe("sendWelcomeEmail", () => {
  test("returns a welcome message", async () => {
    const result = await sendWelcomeEmail({
      name: "learner"
    });

    expect(result).toBe("welcome learner");
  });
});
