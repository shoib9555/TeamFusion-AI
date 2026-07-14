const express = require("express");

const router = express.Router();

const workspaceController = require("../controllers/workspaceController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, workspaceController.createWorkspace);
router.get("/", verifyToken, workspaceController.getAllWorkspaces);
router.get("/:id", verifyToken, workspaceController.getWorkspaceById);
router.put("/:id", verifyToken, workspaceController.updateWorkspace);
router.delete("/:id", verifyToken, workspaceController.deleteWorkspace);

module.exports = router;
