const boardService = require("../services/boardService");
const {
  createBoardSchema,
  updateBoardSchema,
} = require("../validations/boardValidation");

const createBoard = async (req, res) => {
  try {
    const { error } = createBoardSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const board = await boardService.createBoard(
      req.params.projectId,
      req.body
    );

    res.status(201).json({
      message: "Board created successfully",
      board,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const getBoards = async (req, res) => {
  try {
    const boards = await boardService.getBoardsByProject(
      req.params.projectId
    );

    res.status(200).json(boards);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const getBoard = async (req, res) => {
  try {
    const board = await boardService.getBoardById(
  req.params.projectId,
  req.params.id
);

    res.status(200).json(board);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const updateBoard = async (req, res) => {
  try {
    const { error } = updateBoardSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

   const board = await boardService.updateBoard(
  req.params.projectId,
  req.params.id,
  req.body
);

    res.status(200).json({
      message: "Board updated successfully",
      board,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const deleteBoard = async (req, res) => {
  try {
   const result = await boardService.deleteBoard(
  req.params.projectId,
  req.params.id
);

    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

module.exports = {
  createBoard,
  getBoards,
  getBoard,
  updateBoard,
  deleteBoard,
};