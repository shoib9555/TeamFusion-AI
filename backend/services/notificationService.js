const notificationRepository = require("../repositories/notificationRepository");

const createNotification = async (data) => {
  return await notificationRepository.createNotification(data);
};

const getNotifications = async (userId) => {
  return await notificationRepository.findByUser(userId);
};

const getUnreadNotifications = async (userId) => {
  return await notificationRepository.findUnread(userId);
};

const markNotificationRead = async (notificationId, userId) => {
  const notification = await notificationRepository.findById(notificationId);

  if (!notification || notification.userId !== userId) {
    const error = new Error("Notification not found");
    error.statusCode = 404;
    throw error;
  }

  return await notificationRepository.markRead(notification);
};

const markAllNotificationsRead = async (userId) => {
  return await notificationRepository.markAllRead(userId);
};

const deleteNotification = async (notificationId, userId) => {
  const notification = await notificationRepository.findById(notificationId);

  if (!notification || notification.userId !== userId) {
    const error = new Error("Notification not found");
    error.statusCode = 404;
    throw error;
  }

  await notificationRepository.deleteNotification(notification);

  return {
    message: "Notification deleted successfully",
  };
};

module.exports = {
  createNotification,
  getNotifications,
  getUnreadNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
};