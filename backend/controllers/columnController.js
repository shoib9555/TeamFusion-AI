const columnService = require("../services/columnService");

// Create Column
const createColumn = async (req, res) => {
  try {
    const { boardId } = req.params;

    const column = await columnService.createColumn(boardId, req.body);

    res.status(201).json({
      success: true,
      message: "Column created successfully",
      data: column,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Columns
const getColumns = async (req, res) => {
  try {
    const { boardId } = req.params;

    const columns = await columnService.getColumns(boardId);

    res.status(200).json({
      success: true,
      data: columns,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Column
const getColumnById = async (req, res) => {
  try {
    const { boardId, id } = req.params;

    const column = await columnService.getColumnById(boardId, id);

    res.status(200).json({
      success: true,
      data: column,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Column
const updateColumn = async (req, res) => {
  try {
    const { boardId, id } = req.params;

    const column = await columnService.updateColumn(boardId, id, req.body);

    res.status(200).json({
      success: true,
      message: "Column updated successfully",
      data: column,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Column
const deleteColumn = async (req, res) => {
  try {
    const { boardId, id } = req.params;

    const result = await columnService.deleteColumn(boardId, id);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createColumn,
  getColumns,
  getColumnById,
  updateColumn,
  deleteColumn,
};
