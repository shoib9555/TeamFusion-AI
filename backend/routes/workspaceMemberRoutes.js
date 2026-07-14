const express = require("express");
const router = express.Router();

const workspaceMemberController = require("../controllers/workspaceMemberController");
const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeWorkspaceRole } = require("../middleware/workspacePermission");

router.get(
  "/:workspaceId/members",
  verifyToken,
  workspaceMemberController.getWorkspaceMembers,
);
router.post(
  "/:workspaceId/members",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN"]),
  workspaceMemberController.inviteMember
);
router.put(
  "/:workspaceId/members/:userId",
  verifyToken,
  authorizeWorkspaceRole(["OWNER"]),
  workspaceMemberController.updateMemberRole
);

router.delete(
  "/:workspaceId/members/:userId",
  verifyToken,
  authorizeWorkspaceRole(["OWNER"]),
  workspaceMemberController.removeMember
);

module.exports = router;
