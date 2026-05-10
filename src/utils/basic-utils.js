function formatName(name) {
  if (typeof name !== "string") {
    throw new Error("name must be a string");
  }

  return name.trim().toLowerCase();
}

function getEvenNumbers(numbers) {
  if (!Array.isArray(numbers)) {
    throw new Error("input must be an array");
  }

  return numbers.filter((number) => number % 2 === 0);
}

function hasRequiredUserFields(user) {
  if (!user || typeof user !== "object" || Array.isArray(user)) {
    throw new Error("user must be an object");
  }

  return Boolean(user.name && user.email);
}

module.exports = {
  formatName,
  getEvenNumbers,
  hasRequiredUserFields
};
