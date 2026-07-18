require("dotenv").config();

const express = require("express");
const path = require("path");
const { API_PREFIX } = require("./config/api");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const workspaceRoutes = require("./routes/workspaceRoutes");
const workspaceMemberRoutes = require("./routes/workspaceMemberRoutes");
const projectRoutes = require("./routes/projectRoutes");
const boardRoutes = require("./routes/boardRoutes");
const taskRoutes = require("./routes/taskRoutes");
const commentRoutes = require("./routes/commentRoutes");
const attachmentRoutes = require("./routes/attachmentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const sprintRoutes = require("./routes/sprintRoutes");

// Import all models here
require("./models");

const app = express();

// Middleware
app.use(express.json());
// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/workspaces`, workspaceRoutes);
app.use(`${API_PREFIX}/workspaces`, workspaceMemberRoutes);
app.use(`${API_PREFIX}/workspaces`, projectRoutes);
app.use(`${API_PREFIX}/workspaces`, boardRoutes);
app.use(`${API_PREFIX}/workspaces`, taskRoutes);
app.use(
  `${API_PREFIX}/workspaces/:workspaceId/projects/:projectId/boards/:boardId/columns/:columnId/tasks/:taskId/comments`,
  commentRoutes,
);
app.use(
  `${API_PREFIX}/workspaces/:workspaceId/projects/:projectId/boards/:boardId/columns/:columnId/tasks/:taskId/attachments`,
  attachmentRoutes,
);
app.use(`${API_PREFIX}/notifications`, notificationRoutes);
app.use(`${API_PREFIX}/workspaces`, sprintRoutes);



// Test Route
app.get("/", (req, res) => {
  res.send("🚀 TeamForge API is Running.");
});

// Database Connection & Sync
async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("✅ MySQL Connected Successfully");

    // Sync models with database
    const isDevelopment = process.env.NODE_ENV !== "production";

    await sequelize.sync({
      alter: true,
    });
    console.log("✅ Database Synced Successfully");

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
  }
}

startServer();
