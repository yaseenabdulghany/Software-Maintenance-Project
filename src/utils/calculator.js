function add(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("both values must be numbers");
  }

  return a + b;
}

function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("both values must be numbers");
  }

  if (b === 0) {
    throw new Error("cannot divide by zero");
  }

  return a / b;
}

module.exports = {
  add,
  divide
};
