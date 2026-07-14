const { Column } = require("../models");

const create = async (columnData, transaction = null) => {
  return await Column.create(columnData, {
    transaction,
  });
};

const bulkCreate = async (columns, transaction = null) => {
  return await Column.bulkCreate(columns, {
    transaction,
  });
};

const findAllByBoard = async (boardId) => {
  return await Column.findAll({
    where: { boardId },
    order: [["position", "ASC"]],
  });
};

const findById = async (id) => {
  return await Column.findByPk(id);
};

const findByBoardAndName = async (boardId, name) => {
  return await Column.findOne({
    where: {
      boardId,
      name,
    },
  });
};

const update = async (column, data) => {
  return await column.update(data);
};

const remove = async (column) => {
  return await column.destroy();
};

const findByBoardAndId = async (boardId, id) => {
  return await Column.findOne({
    where: {
      id,
      boardId,
    },
  });
};

module.exports = {
  create,
  bulkCreate,
  findAllByBoard,
  findById,
  findByBoardAndName,
  update,
  remove,
  findByBoardAndId,
};