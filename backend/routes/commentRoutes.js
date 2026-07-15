const express = require("express");

const router = express.Router({ mergeParams: true });

const commentController = require("../controllers/commentController");

const { verifyToken } = require("../middleware/authMiddleware");
const {
  authorizeWorkspaceRole,
} = require("../middleware/workspacePermission");

// Create Comment
router.post(
  "/",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN", "MEMBER"]),
  commentController.createComment
);

// Get Comments
router.get(
  "/",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN", "MEMBER"]),
  commentController.getComments
);

// Update Comment
router.put(
  "/:commentId",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN", "MEMBER"]),
  commentController.updateComment
);

// Delete Comment
router.delete(
  "/:commentId",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN", "MEMBER"]),
  commentController.deleteComment
);

module.exports = router;