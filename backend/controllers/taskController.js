const taskService = require("../services/taskService");

// Create Task
const createTask = async (req, res) => {
  try {
    const { workspaceId, projectId, boardId, columnId } = req.params;

    const task = await taskService.createTask(
      workspaceId,
      projectId,
      boardId,
      columnId,
      req.body,
      req.user.id
    );

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Tasks
const getTasksByColumn = async (req, res) => {
  try {
    const { projectId, boardId, columnId } = req.params;

    const tasks = await taskService.getTasksByColumn(
      projectId,
      boardId,
      columnId
    );

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Task
const getTaskById = async (req, res) => {
  try {
    const { projectId, boardId, columnId, taskId } = req.params;

    const task = await taskService.getTaskById(
      projectId,
      boardId,
      columnId,
      taskId
    );

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const {
      workspaceId,
      projectId,
      boardId,
      columnId,
      taskId,
    } = req.params;

    const task = await taskService.updateTask(
      workspaceId,
      projectId,
      boardId,
      columnId,
      taskId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const {
      workspaceId,
      projectId,
      boardId,
      columnId,
      taskId,
    } = req.params;

    const result = await taskService.deleteTask(
      workspaceId,
      projectId,
      boardId,
      columnId,
      taskId
    );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const moveTask = async (req, res) => {

  try {

    const {
      workspaceId,
      projectId,
      boardId,
      taskId,
    } = req.params;

    const { targetColumnId } = req.body;

    const task =
      await taskService.moveTask(
        workspaceId,
        projectId,
        boardId,
        taskId,
        targetColumnId
      );

    res.status(200).json({
      success: true,
      message: "Task moved successfully",
      data: task,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};
module.exports = {
  createTask,
  getTasksByColumn,
  getTaskById,
  updateTask,
  deleteTask,
  moveTask,
};