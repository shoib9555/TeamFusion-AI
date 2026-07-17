const express = require("express");
const router = express.Router();

const notificationController = require("../controllers/notificationController");
const { verifyToken } = require("../middleware/authMiddleware");

// Protect all notification routes
router.use(verifyToken);

// Get all notifications
router.get("/", notificationController.getNotifications);

// Get unread notifications
router.get("/unread", notificationController.getUnreadNotifications);

// Mark one notification as read
router.patch("/:id/read", notificationController.markNotificationRead);

// Mark all notifications as read
router.patch("/read-all", notificationController.markAllNotificationsRead);

// Delete notification
router.delete("/:id", notificationController.deleteNotification);

module.exports = router;