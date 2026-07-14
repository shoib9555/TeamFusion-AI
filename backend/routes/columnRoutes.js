const express = require("express");

const router = express.Router({ mergeParams: true });

const columnController = require("../controllers/columnController");

const { verifyToken } = require("../middleware/authMiddleware");

const {
  authorizeWorkspaceRole,
} = require("../middleware/workspacePermission");

// Create Column
router.post(
  "/",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN"]),
  columnController.createColumn
);

// Get All Columns
router.get(
  "/",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN", "MEMBER"]),
  columnController.getColumns
);

// Get Single Column
router.get(
  "/:id",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN", "MEMBER"]),
  columnController.getColumnById
);

// Update Column
router.put(
  "/:id",
  verifyToken,
  authorizeWorkspaceRole(["OWNER", "ADMIN"]),
  columnController.updateColumn
);

// Delete Column
router.delete(
  "/:id",
  verifyToken,
  authorizeWorkspaceRole(["OWNER"]),
  columnController.deleteColumn
);

module.exports = router;