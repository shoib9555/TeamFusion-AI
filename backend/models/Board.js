const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Board = sequelize.define(
  "Board",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    projectId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM("SCRUM", "KANBAN"),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("ACTIVE", "ARCHIVED"),
      allowNull: false,
      defaultValue: "ACTIVE",
    },
  },
  {
    tableName: "boards",
    timestamps: true,
  }
);

module.exports = Board;