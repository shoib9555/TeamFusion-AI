const express = require("express");

const router = express.Router();

const projectController = require("../controllers/projectController");
const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeWorkspaceRole } = require("../middleware/workspacePermission");


// Create Project (OWNER, ADMIN)
router.post(
  "/:workspaceId/projects",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN"]),
  projectController.createProject
);

// Get All Projects (OWNER, ADMIN, MEMBER)
router.get(
  "/:workspaceId/projects",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN", "MEMBER"]),
  projectController.getWorkspaceProjects
);

// Get Single Project
router.get(
  "/:workspaceId/projects/:id",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN", "MEMBER"]),
  projectController.getProjectById
);

// Update Project
router.put(
  "/:workspaceId/projects/:id",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN"]),
  projectController.updateProject
);

// Delete Project
router.delete(
  "/:workspaceId/projects/:id",
  verifyToken,
  authorizeWorkspaceRole(["OWNER"]),
  projectController.deleteProject
);

module.exports = router;