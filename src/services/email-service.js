async function sendWelcomeEmail(user) {
  return `welcome ${user.name}`;
}

module.exports = {
  sendWelcomeEmail
};
