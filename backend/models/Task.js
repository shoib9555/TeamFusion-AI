const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    columnId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    sprintId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    priority: {
      type: DataTypes.ENUM("LOW", "MEDIUM", "HIGH"),
      defaultValue: "MEDIUM",
    },

    status: {
      type: DataTypes.ENUM("TODO", "IN_PROGRESS", "TESTING", "DONE"),
      defaultValue: "TODO",
    },

    assigneeId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },

    reporterId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    storyPoints: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "tasks",
    timestamps: true,
  },
);

module.exports = Task;
