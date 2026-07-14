const columnRepository = require("../repositories/columnRepository");
const boardRepository = require("../repositories/boardRepository");
const {
  createColumnSchema,
  updateColumnSchema,
} = require("../validations/columnValidation");

// Create Column
const createColumn = async (boardId, columnData) => {
  // Validate request
  const { error } = createColumnSchema.validate(columnData);

  if (error) {
    throw new Error(error.details[0].message);
  }

  // Check board exists
  const board = await boardRepository.getBoardById(boardId);

  if (!board) {
    throw new Error("Board not found");
  }

  // Check duplicate column name
  const existingColumn = await columnRepository.findByBoardAndName(
    boardId,
    columnData.name
  );

  if (existingColumn) {
    throw new Error("Column name already exists");
  }

  // Get existing columns
  const columns = await columnRepository.findAllByBoard(boardId);

  // Assign next position
  const position = columns.length + 1;

  return await columnRepository.create({
    boardId,
    name: columnData.name,
    position,
  });
};

// Get All Columns
const getColumns = async (boardId) => {
  const board = await boardRepository.getBoardById(boardId);

  if (!board) {
    throw new Error("Board not found");
  }

  return await columnRepository.findAllByBoard(boardId);
};

// Get Column By Id
const getColumnById = async (boardId, id) => {
  const board = await boardRepository.getBoardById(boardId);

  if (!board) {
    throw new Error("Board not found");
  }

  const column = await columnRepository.findByBoardAndId(
    boardId,
    id
  );

  if (!column) {
    throw new Error("Column not found");
  }

  return column;
};

// Update Column
const updateColumn = async (boardId,id, updateData) => {
  const { error } = updateColumnSchema.validate(updateData);

  if (error) {
    throw new Error(error.details[0].message);
  }

  const board = await boardRepository.getBoardById(boardId);

if (!board) {
  throw new Error("Board not found");
}

const column = await columnRepository.findByBoardAndId(
  boardId,
  id
);

if (!column) {
  throw new Error("Column not found");
}

  if (updateData.name) {
    const existingColumn = await columnRepository.findByBoardAndName(
      column.boardId,
      updateData.name
    );

    if (existingColumn && existingColumn.id !== column.id) {
      throw new Error("Column name already exists");
    }
  }

  return await columnRepository.update(column, updateData);
};

// Delete Column
// Delete Column
const deleteColumn = async (boardId, id) => {
  // Check board exists
  const board = await boardRepository.getBoardById(boardId);

  if (!board) {
    throw new Error("Board not found");
  }

  // Check column belongs to this board
  const column = await columnRepository.findByBoardAndId(boardId, id);

  if (!column) {
    throw new Error("Column not found");
  }

  // Prevent deleting the last column
  const columns = await columnRepository.findAllByBoard(boardId);

  if (columns.length === 1) {
    throw new Error("Cannot delete the last column");
  }

  await columnRepository.remove(column);

  return {
    message: "Column deleted successfully",
  };
};

module.exports = {
  createColumn,
  getColumns,
  getColumnById,
  updateColumn,
  deleteColumn,
};