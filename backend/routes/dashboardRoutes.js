const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

const { verifyToken } = require("../middleware/authMiddleware");
const {
  authorizeWorkspaceRole,
} = require("../middleware/workspacePermission");

// Workspace Dashboard (OWNER, ADMIN, MEMBER)
router.get(
  "/workspaces/:workspaceId",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN", "MEMBER"]),
  dashboardController.getWorkspaceDashboard
);

// Project Dashboard (OWNER, ADMIN, MEMBER)
router.get(
  "/projects/:projectId",
  verifyToken,
  dashboardController.getProjectDashboard
);

// Sprint Dashboard (OWNER, ADMIN, MEMBER)
router.get(
  "/projects/:projectId/sprints/:sprintId",
  verifyToken,
  dashboardController.getSprintDashboard
);

// User Dashboard
router.get(
  "/users/:userId",
  verifyToken,
  dashboardController.getUserDashboard
);

// Project Status Analytics
router.get(
  "/projects/:projectId/status",
  verifyToken,
  dashboardController.getProjectStatusAnalytics
);
// Project Prioprity Analytics
router.get(
  "/projects/:projectId/priority",
  verifyToken,
  dashboardController.getProjectPriorityAnalytics
);
// Project Assine Analytics
router.get(
  "/projects/:projectId/assignees",
  verifyToken,
  dashboardController.getProjectAssigneeAnalytics
);
// Project ProjectOverDueTask Analytics
router.get(
  "/projects/:projectId/overdue",
  verifyToken,
  dashboardController.getProjectOverdueTasks
);
// Project ProjectUpcomingTask Analytics
router.get(
  "/projects/:projectId/upcoming",
  verifyToken,
  dashboardController.getProjectUpcomingTasks
);
// Project Project Sprint Velocity Analytics
router.get(
  "/projects/:projectId/velocity",
  verifyToken,
  dashboardController.getProjectSprintVelocity
);
// Project Project getProjectBurndown Analytics
router.get(
  "/projects/:projectId/burndown",
  verifyToken,
  dashboardController.getProjectBurndown
);
module.exports = router;