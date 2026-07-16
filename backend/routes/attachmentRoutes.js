const express = require("express");

const router = express.Router({ mergeParams: true });

const attachmentController = require("../controllers/attachmentController");

const { verifyToken } = require("../middleware/authMiddleware");

const {
  authorizeWorkspaceRole,
} = require("../middleware/workspacePermission");

const upload = require("../middleware/uploadMiddleware");

// Upload Attachment
router.post(
  "/",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN", "MEMBER"]),
  upload.single("file"),
  attachmentController.uploadAttachment
);

// Get Attachments
router.get(
  "/",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN", "MEMBER"]),
  attachmentController.getAttachments
);

// Download Attachment
router.get(
  "/:attachmentId",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN", "MEMBER"]),
  attachmentController.downloadAttachment
);

// Delete Attachment
router.delete(
  "/:attachmentId",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN", "MEMBER"]),
  attachmentController.deleteAttachment
);

module.exports = router;