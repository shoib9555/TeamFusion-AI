const express = require("express");
const router = express.Router();

const sprintController = require("../controllers/sprintController");

const { verifyToken } = require("../middleware/authMiddleware");
const {
  authorizeWorkspaceRole,
} = require("../middleware/workspacePermission");

// Create Sprint (OWNER, ADMIN)
router.post(
  "/:workspaceId/projects/:projectId/sprints",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN"]),
  sprintController.createSprint
);

// Get All Sprints (OWNER, ADMIN, MEMBER)
router.get(
  "/:workspaceId/projects/:projectId/sprints",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN", "MEMBER"]),
  sprintController.getSprints
);

// Get Single Sprint (OWNER, ADMIN, MEMBER)
router.get(
  "/:workspaceId/projects/:projectId/sprints/:sprintId",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN", "MEMBER"]),
  sprintController.getSprint
);

// Update Sprint (OWNER, ADMIN)
router.patch(
  "/:workspaceId/projects/:projectId/sprints/:sprintId",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN"]),
  sprintController.updateSprint
);

// Delete Sprint (OWNER)
router.delete(
  "/:workspaceId/projects/:projectId/sprints/:sprintId",
  verifyToken,
  authorizeWorkspaceRole(["OWNER"]),
  sprintController.deleteSprint
);

// Start Sprint (OWNER, ADMIN)
router.patch(
  "/:workspaceId/projects/:projectId/sprints/:sprintId/start",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN"]),
  sprintController.startSprint
);

// Complete Sprint (OWNER, ADMIN)
router.patch(
  "/:workspaceId/projects/:projectId/sprints/:sprintId/complete",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN"]),
  sprintController.completeSprint
);

// Add Task to Sprint (OWNER, ADMIN)
router.post(
  "/:workspaceId/projects/:projectId/sprints/:sprintId/tasks/:taskId",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN"]),
  sprintController.addTaskToSprint
);

// Remove Task from Sprint (OWNER, ADMIN)
router.delete(
  "/:workspaceId/projects/:projectId/sprints/:sprintId/tasks/:taskId",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN"]),
  sprintController.removeTaskFromSprint
);

module.exports = router;