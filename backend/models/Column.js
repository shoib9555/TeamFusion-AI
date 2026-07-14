const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Column = sequelize.define(
  "Column",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    boardId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "columns",
    timestamps: true,
  }
);

module.exports = Column;