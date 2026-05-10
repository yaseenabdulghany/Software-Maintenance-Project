let users = [];
let nextId = 1;

function createError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function validateUser(user) {
  if (!user || !user.name || !user.email) {
    throw createError("name and email are required", 400);
  }
}

function getUsers() {
  return users.map((user) => ({ ...user }));
}

function findUserById(id) {
  return users.find((user) => user.id === id) || null;
}

function addUser(userData) {
  validateUser(userData);

  const user = {
    id: nextId++,
    name: userData.name,
    email: userData.email
  };

  users.push(user);
  return { ...user };
}

function updateUser(id, updates) {
  const existingUser = findUserById(id);
  if (!existingUser) {
    throw createError("user not found", 404);
  }

  const updatedUser = { ...existingUser, ...updates };
  validateUser(updatedUser);

  users = users.map((user) => (user.id === id ? updatedUser : user));
  return { ...updatedUser };
}

function deleteUser(id) {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    throw createError("user not found", 404);
  }

  const [removedUser] = users.splice(userIndex, 1);
  return { ...removedUser };
}

function resetUsers() {
  users = [];
  nextId = 1;
}

module.exports = {
  getUsers,
  findUserById,
  addUser,
  updateUser,
  deleteUser,
  resetUsers
};
