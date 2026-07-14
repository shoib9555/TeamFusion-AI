const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Workspace = sequelize.define(
  "Workspace",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    ownerId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    tableName: "workspaces",
    timestamps: true,
  }
);

module.exports = Workspace;