const { sendWelcomeEmail } = require("./email-service");

async function notifyNewUser(user) {
  if (!user || !user.email || !user.name) {
    throw new Error("user name and email are required");
  }

  const message = await sendWelcomeEmail(user);
  return {
    sent: true,
    message
  };
}

module.exports = {
  notifyNewUser
};
