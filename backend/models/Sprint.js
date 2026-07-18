const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Sprint = sequelize.define(
  "Sprint",
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
      type: DataTypes.STRING,
      allowNull: false,
    },

    goal: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM(
        "PLANNED",
        "ACTIVE",
        "COMPLETED"
      ),
      allowNull: false,
      defaultValue: "PLANNED",
    },

    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    tableName: "sprints",
    timestamps: true,
  }
);

module.exports = Sprint;