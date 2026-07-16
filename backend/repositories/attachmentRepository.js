const { Attachment, User } = require("../models");

// Create Attachment
const createAttachment = async (attachmentData) => {
  return await Attachment.create(attachmentData);
};

// Get All Attachments of a Task
const findAllByTask = async (taskId) => {
  return await Attachment.findAll({
    where: { taskId },
    include: [
      {
        model: User,
        as: "user",
        attributes: [
          "id",
          "firstName",
          "lastName",
          "email",
          "profileImage",
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

// Get Attachment by ID
const findById = async (attachmentId) => {
  return await Attachment.findByPk(attachmentId, {
    include: [
      {
        model: User,
        as: "user",
        attributes: [
          "id",
          "firstName",
          "lastName",
          "email",
          "profileImage",
        ],
      },
    ],
  });
};

// Delete Attachment
const deleteAttachment = async (attachment) => {
  return await attachment.destroy();
};

module.exports = {
  createAttachment,
  findAllByTask,
  findById,
  deleteAttachment,
};