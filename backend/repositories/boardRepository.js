const { Board } = require("../models");

async function createBoard(boardData, transaction = null) {
  return await Board.create(boardData, {
    transaction,
  });
}

async function getBoardsByProject(projectId) {
  return await Board.findAll({
    where: { projectId },
    order: [["createdAt", "DESC"]],
  });
}

async function getBoardById(id) {
  return await Board.findByPk(id);
}

async function findBoardByName(projectId, name) {
  return await Board.findOne({
    where: {
      projectId,
      name,
    },
  });
}

async function updateBoard(board, data) {
  return await board.update(data);
}

async function deleteBoard(board) {
  return await board.destroy();
}
async function getBoardByProject(projectId, boardId) {
  return await Board.findOne({
    where: {
      id: boardId,
      projectId,
    },
  });
}

module.exports = {
  createBoard,
  getBoardsByProject,
  getBoardById,
  findBoardByName,
  updateBoard,
  deleteBoard,
  getBoardByProject,
};