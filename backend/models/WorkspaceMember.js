const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const WorkspaceMember = sequelize.define(
  "WorkspaceMember",
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

    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("OWNER", "ADMIN", "MEMBER"),
      allowNull: false,
      defaultValue: "MEMBER",
    },
  },
  {
    tableName: "WorkspaceMembers",
    timestamps: true,
  }
);

module.exports = WorkspaceMember;