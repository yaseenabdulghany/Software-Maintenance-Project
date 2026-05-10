const userStore = require("../services/user-store");

function getUsers(req, res) {
  return res.status(200).json({
    data: userStore.getUsers()
  });
}

function createUser(req, res) {
  try {
    const user = userStore.addUser(req.body);
    return res.status(201).json({
      message: "user created successfully",
      data: user
    });
  } catch (error) {
    return res.status(error.status).json({
      error: error.message
    });
  }
}

function updateUser(req, res) {
  try {
    const userId = Number(req.params.id);
    const user = userStore.updateUser(userId, req.body);
    return res.status(200).json({
      message: "user updated successfully",
      data: user
    });
  } catch (error) {
    return res.status(error.status).json({
      error: error.message
    });
  }
}

function deleteUser(req, res) {
  try {
    const userId = Number(req.params.id);
    const removedUser = userStore.deleteUser(userId);
    return res.status(200).json({
      message: "user deleted successfully",
      data: removedUser
    });
  } catch (error) {
    return res.status(error.status).json({
      error: error.message
    });
  }
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
