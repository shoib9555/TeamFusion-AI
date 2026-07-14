const sequelize = require("../config/db");

const User = require("./User");
const Workspace = require("./Workspace");
const WorkspaceMember = require("./WorkspaceMember");
const Project = require("./Project");
const Board = require("./Board");
const Column = require("./Column");
const Task = require("./Task");

// User ↔ Workspace
User.hasMany(Workspace, {
  foreignKey: "ownerId",
  as: "workspaces",
});

// User ↔ Assigned Tasks

User.hasMany(Task, {
  foreignKey: "assigneeId",
  as: "assignedTasks",
});

Task.belongsTo(User, {
  foreignKey: "assigneeId",
  as: "assignee",
});

// User ↔ Reported Tasks

User.hasMany(Task, {
  foreignKey: "reporterId",
  as: "reportedTasks",
});

Task.belongsTo(User, {
  foreignKey: "reporterId",
  as: "reporter",
});

Workspace.belongsTo(User, {
  foreignKey: "ownerId",
  as: "owner",
});

// Workspace ↔ WorkspaceMember
Workspace.hasMany(WorkspaceMember, {
  foreignKey: "workspaceId",
  onDelete: "CASCADE",
});

WorkspaceMember.belongsTo(Workspace, {
  foreignKey: "workspaceId",
});

// User ↔ WorkspaceMember
User.hasMany(WorkspaceMember, {
  foreignKey: "userId",
});

WorkspaceMember.belongsTo(User, {
  foreignKey: "userId",
});

// Workspace ↔ Project
Workspace.hasMany(Project, {
  foreignKey: "workspaceId",
  as: "projects",
});

Project.belongsTo(Workspace, {
  foreignKey: "workspaceId",
  as: "workspace",
});

// Project ↔ Board
Project.hasMany(Board, {
  foreignKey: "projectId",
  as: "boards",
  onDelete: "CASCADE",
});

Board.belongsTo(Project, {
  foreignKey: "projectId",
  as: "project",
});

Board.hasMany(Column, {
  foreignKey: "boardId",
  as: "columns",
  onDelete: "CASCADE",
});

Column.belongsTo(Board, {
  foreignKey: "boardId",
  as: "board",
});

// Column ↔ Task

Column.hasMany(Task, {
  foreignKey: "columnId",
  as: "tasks",
  onDelete: "CASCADE",
});

Task.belongsTo(Column, {
  foreignKey: "columnId",
  as: "column",
});

module.exports = {
  sequelize,
  User,
  Workspace,
  WorkspaceMember,
  Project,
  Board,
  Column,
  Task,
};