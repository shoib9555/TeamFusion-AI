const boardRepository = require("../repositories/boardRepository");
const projectRepository = require("../repositories/projectRepository");
const columnRepository = require("../repositories/columnRepository");

const { sequelize } = require("../models");

const createBoard = async (projectId, boardData) => {
  const project = await projectRepository.getProjectById(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  const existingBoard = await boardRepository.findBoardByName(
    projectId,
    boardData.name
  );

  if (existingBoard) {
    throw new Error("Board name already exists in this project");
  }

  // Start transaction
  const transaction = await sequelize.transaction();

  try {
    // Create board
    const board = await boardRepository.createBoard(
      {
        ...boardData,
        projectId,
      },
      transaction
    );

    // Automatically create default columns
    await columnRepository.bulkCreate(
      [
        {
          boardId: board.id,
          name: "Todo",
          position: 1,
        },
        {
          boardId: board.id,
          name: "In Progress",
          position: 2,
        },
        {
          boardId: board.id,
          name: "Testing",
          position: 3,
        },
        {
          boardId: board.id,
          name: "Done",
          position: 4,
        },
      ],
      transaction
    );

    // Commit transaction
    await transaction.commit();

    return board;
  } catch (error) {
    // Rollback if anything fails
    await transaction.rollback();
    throw error;
  }
};

// Get All Boards
const getBoardsByProject = async (projectId) => {
  const project = await projectRepository.getProjectById(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  return await boardRepository.getBoardsByProject(projectId);
};

// Get Single Board
const getBoardById = async (projectId, boardId) => {
  const board = await boardRepository.getBoardByProject(
    projectId,
    boardId
  );

  if (!board) {
    throw new Error("Board not found in this project");
  }

  return board;
};

// Update Board
const updateBoard = async (projectId, boardId, data) => {
  const board = await boardRepository.getBoardByProject(
    projectId,
    boardId
  );

  if (!board) {
    throw new Error("Board not found in this project");
  }

  if (data.name && data.name !== board.name) {
    const existingBoard = await boardRepository.findBoardByName(
      projectId,
      data.name
    );

    if (existingBoard) {
      throw new Error("Board name already exists in this project");
    }
  }

  return await boardRepository.updateBoard(board, data);
};

// Delete Board
const deleteBoard = async (projectId, boardId) => {
  const board = await boardRepository.getBoardByProject(
    projectId,
    boardId
  );

  if (!board) {
    throw new Error("Board not found in this project");
  }

  await boardRepository.deleteBoard(board);

  return {
    message: "Board deleted successfully",
  };
};

module.exports = {
  createBoard,
  getBoardsByProject,
  getBoardById,
  updateBoard,
  deleteBoard,
};