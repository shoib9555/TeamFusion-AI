const { Notification } = require("../models");

const createNotification = async (data) => {
  return await Notification.create(data);
};

const findByUser = async (userId) => {
  return await Notification.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });
};

const findUnread = async (userId) => {
  return await Notification.findAll({
    where: {
      userId,
      isRead: false,
    },
    order: [["createdAt", "DESC"]],
  });
};

const findById = async (id) => {
  return await Notification.findByPk(id);
};

const markRead = async (notification) => {
  notification.isRead = true;
  return await notification.save();
};

const markAllRead = async (userId) => {
  return await Notification.update(
    { isRead: true },
    {
      where: {
        userId,
        isRead: false,
      },
    }
  );
};

const deleteNotification = async (notification) => {
  return await notification.destroy();
};

module.exports = {
  createNotification,
  findByUser,
  findUnread,
  findById,
  markRead,
  markAllRead,
  deleteNotification,
};