const express = require("express");

const router = express.Router();

const boardController = require("../controllers/boardController");
const { verifyToken } = require("../middleware/authMiddleware");
const {
  authorizeWorkspaceRole,
} = require("../middleware/workspacePermission");
const columnRoutes = require("./columnRoutes");
// Create Board
router.post(
  "/:workspaceId/projects/:projectId/boards",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN"]),
  boardController.createBoard
);

// Get All Boards
router.get(
  "/:workspaceId/projects/:projectId/boards",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN", "MEMBER"]),
  boardController.getBoards
);

// Get Single Board
router.get(
  "/:workspaceId/projects/:projectId/boards/:id",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN", "MEMBER"]),
  boardController.getBoard
);

// Update Board
router.put(
  "/:workspaceId/projects/:projectId/boards/:id",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN"]),
  boardController.updateBoard
);

// Delete Board
router.delete(
  "/:workspaceId/projects/:projectId/boards/:id",
  verifyToken,
  authorizeWorkspaceRole(["OWNER"]),
  boardController.deleteBoard
);

router.use(
  "/:workspaceId/projects/:projectId/boards/:boardId/columns",
  columnRoutes
);

module.exports = router;