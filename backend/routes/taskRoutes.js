const express = require("express");

const router = express.Router();

const taskController = require("../controllers/taskController");

const { verifyToken } = require("../middleware/authMiddleware");
const {
  authorizeWorkspaceRole,
} = require("../middleware/workspacePermission");

// Create Task (OWNER, ADMIN)
router.post(
  "/:workspaceId/projects/:projectId/boards/:boardId/columns/:columnId/tasks",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN"]),
  taskController.createTask
);

// Get Tasks (OWNER, ADMIN, MEMBER)
router.get(
  "/:workspaceId/projects/:projectId/boards/:boardId/columns/:columnId/tasks",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN", "MEMBER"]),
  taskController.getTasksByColumn
);

// Get Single Task (OWNER, ADMIN, MEMBER)
router.get(
  "/:workspaceId/projects/:projectId/boards/:boardId/columns/:columnId/tasks/:taskId",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN", "MEMBER"]),
  taskController.getTaskById
);

// Update Task (OWNER, ADMIN)
router.put(
  "/:workspaceId/projects/:projectId/boards/:boardId/columns/:columnId/tasks/:taskId",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN"]),
  taskController.updateTask
);

// Delete Task (OWNER only)
router.delete(
  "/:workspaceId/projects/:projectId/boards/:boardId/columns/:columnId/tasks/:taskId",
  verifyToken,
  authorizeWorkspaceRole(["OWNER"]),
  taskController.deleteTask
);

router.patch(
  "/:workspaceId/projects/:projectId/boards/:boardId/tasks/:taskId/move",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN"]),
  taskController.moveTask
);

module.exports = router;