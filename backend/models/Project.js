const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    workspaceId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    key: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    type: {
      type: DataTypes.ENUM("SCRUM", "KANBAN"),
      allowNull: false,
      defaultValue: "SCRUM",
    },

    status: {
      type: DataTypes.ENUM("ACTIVE", "ARCHIVED"),
      allowNull: false,
      defaultValue: "ACTIVE",
    },
  },
  {
    tableName: "projects",
    timestamps: true,
  }
);

module.exports = Project;