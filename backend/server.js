require("dotenv").config();

const express = require("express");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const workspaceRoutes = require("./routes/workspaceRoutes");
const workspaceMemberRoutes = require("./routes/workspaceMemberRoutes");
const projectRoutes = require("./routes/projectRoutes");
const boardRoutes = require("./routes/boardRoutes");
const taskRoutes = require("./routes/taskRoutes");
const commentRoutes = require("./routes/commentRoutes");

// Import all models here
require("./models");

const app = express();

// Middleware
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/workspaces", workspaceMemberRoutes);
app.use("/api/workspaces", projectRoutes);
app.use("/api/workspaces", boardRoutes);
app.use("/api/workspaces", taskRoutes);
app.use(
  "/api/workspaces/:workspaceId/projects/:projectId/boards/:boardId/columns/:columnId/tasks/:taskId/comments",
  commentRoutes
);

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

    await sequelize.sync();
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
