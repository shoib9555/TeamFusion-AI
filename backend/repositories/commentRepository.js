const { Comment, User } = require("../models");

// Create Comment
const create = async (data, transaction = null) => {
  return await Comment.create(data, { transaction });
};

// Find Comment by ID
const findById = async (id) => {
  return await Comment.findByPk(id);
};

// Get all comments of a task
const findByTaskId = async (taskId) => {
  return await Comment.findAll({
    where: { taskId },
   include: [
  {
    model: User,
    as: "user",
    attributes: ["id", "firstName", "lastName", "email", "profileImage"],
  },
],
    order: [["createdAt", "ASC"]],
  });
};

// IDOR Protection
const findByTaskAndId = async (taskId, commentId) => {
  return await Comment.findOne({
    where: {
      id: commentId,
      taskId,
    },
  });
};

// Update Comment
const update = async (comment, data, transaction = null) => {
  return await comment.update(data, { transaction });
};

// Delete Comment
const remove = async (comment, transaction = null) => {
  return await comment.destroy({ transaction });
};

module.exports = {
  create,
  findById,
  findByTaskId,
  findByTaskAndId,
  update,
  remove,
};