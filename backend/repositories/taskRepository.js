const { Task } = require("../models");

// Create Task
const createTask = async (taskData, transaction = null) => {
  return await Task.create(taskData, { transaction });
};

// Get All Tasks in a Column
const findAllByColumn = async (columnId) => {
  return await Task.findAll({
    where: { columnId },
    order: [["position", "ASC"]],
  });
};

// Get Task by ID
const findById = async (id) => {
  return await Task.findByPk(id);
};

// Get Task by Column & ID (IDOR Protection)
const findByColumnAndId = async (columnId, taskId) => {
  return await Task.findOne({
    where: {
      id: taskId,
      columnId,
    },
  });
};

// Find Duplicate Task Title in Same Column
const findByColumnAndTitle = async (columnId, title) => {
  return await Task.findOne({
    where: {
      columnId,
      title,
    },
  });
};

// Update Task
const updateTask = async (task, data) => {
  return await task.update(data);
};

// Delete Task
const deleteTask = async (task, transaction = null) => {
  return await task.destroy({
    transaction,
  });
};

// Get Last Position in Column
const getLastPosition = async (columnId, transaction = null) => {
  const task = await Task.findOne({
    where: { columnId },
    order: [["position", "DESC"]],
    transaction,
  });

  return task ? task.position : 0;
};

// Move Task to Another Column
const moveTask = async (
  task,
  columnId,
  position,
  transaction = null
) => {
  return await task.update(
    {
      columnId,
      position,
    },
    {
      transaction,
    }
  );
};

module.exports = {
  createTask,
  findAllByColumn,
  findById,
  findByColumnAndId,
  findByColumnAndTitle,
  updateTask,
  deleteTask,
  getLastPosition,
  moveTask,
};