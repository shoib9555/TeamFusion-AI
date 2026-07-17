const taskRepository = require("../repositories/taskRepository");
const columnRepository = require("../repositories/columnRepository");
const boardRepository = require("../repositories/boardRepository");
const projectRepository = require("../repositories/projectRepository");
const workspaceMemberRepository = require("../repositories/workspaceMemberRepository");
const notificationRepository = require("../repositories/notificationRepository");

const { sequelize } = require("../models");

const {
  createTaskSchema,
  updateTaskSchema,
} = require("../validations/taskValidation");

// Create Task
const createTask = async (
  workspaceId,
  projectId,
  boardId,
  columnId,
  taskData,
  reporterId
) => {
  // Validate input
  const { error } = createTaskSchema.validate(taskData);

  if (error) {
    throw new Error(error.details[0].message);
  }

  // Validate project
  const project = await projectRepository.getProjectById(projectId);

  if (!project || project.workspaceId != workspaceId) {
    throw new Error("Project not found");
  }

  // Validate board
  const board = await boardRepository.getBoardByProject(
    projectId,
    boardId
  );

  if (!board) {
    throw new Error("Board not found");
  }

  // Validate column
  const column = await columnRepository.findByBoardAndId(
    boardId,
    columnId
  );

  if (!column) {
    throw new Error("Column not found");
  }

  // Duplicate title check
  const existingTask = await taskRepository.findByColumnAndTitle(
    columnId,
    taskData.title
  );

  if (existingTask) {
    throw new Error("Task title already exists in this column");
  }

  // Validate assignee
  if (taskData.assigneeId) {
    const member =
      await workspaceMemberRepository.getMemberRole(
        workspaceId,
        taskData.assigneeId
      );

    if (!member) {
      throw new Error("Assignee is not a workspace member");
    }
  }

  // Position
const transaction = await sequelize.transaction();

try {

  const lastPosition =
    await taskRepository.getLastPosition(
      columnId,
      transaction
    );

const task =
  await taskRepository.createTask(
    {
      ...taskData,
      columnId,
      reporterId,
      position: lastPosition + 1,
    },
    transaction
  );

await transaction.commit();

// Create notification if task has an assignee
if (task.assigneeId) {
  await notificationRepository.createNotification({
    userId: task.assigneeId,
    taskId: task.id,
    type: "TASK_ASSIGNED",
    title: "Task Assigned",
    message: `You have been assigned the task "${task.title}".`,
  });
}

return task;

} catch (error) {

  await transaction.rollback();

  throw error;

}
};
// Get Tasks
const getTasksByColumn = async (
  projectId,
  boardId,
  columnId
) => {
  const board = await boardRepository.getBoardByProject(
    projectId,
    boardId
  );

  if (!board) {
    throw new Error("Board not found");
  }

  const column =
    await columnRepository.findByBoardAndId(
      boardId,
      columnId
    );

  if (!column) {
    throw new Error("Column not found");
  }

  return await taskRepository.findAllByColumn(columnId);
};

// Get Single Task
const getTaskById = async (
  projectId,
  boardId,
  columnId,
  taskId
) => {
  const task =
    await taskRepository.findByColumnAndId(
      columnId,
      taskId
    );

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};

// Update Task
const updateTask = async (
  workspaceId,
  projectId,
  boardId,
  columnId,
  taskId,
  taskData
) => {
  // Validate request body
  const { error } = updateTaskSchema.validate(taskData);

  if (error) {
    throw new Error(error.details[0].message);
  }

  // Validate Project
  const project = await projectRepository.getProjectById(projectId);

  if (!project || project.workspaceId != workspaceId) {
    throw new Error("Project not found");
  }

  // Validate Board
  const board = await boardRepository.getBoardByProject(
    projectId,
    boardId
  );

  if (!board) {
    throw new Error("Board not found");
  }

  // Validate Column
  const column = await columnRepository.findByBoardAndId(
    boardId,
    columnId
  );

  if (!column) {
    throw new Error("Column not found");
  }

  // Validate Task (IDOR Protection)
  const task = await taskRepository.findByColumnAndId(
    columnId,
    taskId
  );
const oldAssigneeId = task.assigneeId;
  if (!task) {
    throw new Error("Task not found");
  }

  // Duplicate title check
  if (taskData.title && taskData.title !== task.title) {
    const existingTask =
      await taskRepository.findByColumnAndTitle(
        columnId,
        taskData.title
      );

    if (existingTask) {
      throw new Error(
        "Task title already exists in this column"
      );
    }
  }

  // Validate assignee
  if (taskData.assigneeId) {
    const member =
      await workspaceMemberRepository.getMemberRole(
        workspaceId,
        taskData.assigneeId
      );

    if (!member) {
      throw new Error(
        "Assignee is not a workspace member"
      );
    }
  }

  const updatedTask = await taskRepository.updateTask(task, taskData);

// Notify only if assignee changed
if (
  updatedTask.assigneeId &&
  updatedTask.assigneeId !== oldAssigneeId
) {
  await notificationRepository.createNotification({
    userId: updatedTask.assigneeId,
    taskId: updatedTask.id,
    type: "TASK_ASSIGNED",
    title: "Task Assigned",
    message: `You have been assigned the task "${updatedTask.title}".`,
  });
}

return updatedTask;
};

// Delete Task
const deleteTask = async (
  workspaceId,
  projectId,
  boardId,
  columnId,
  taskId
) => {
  // Validate Project
  const project = await projectRepository.getProjectById(projectId);

  if (!project || project.workspaceId != workspaceId) {
    throw new Error("Project not found");
  }

  // Validate Board
  const board = await boardRepository.getBoardByProject(
    projectId,
    boardId
  );

  if (!board) {
    throw new Error("Board not found");
  }

  // Validate Column
  const column = await columnRepository.findByBoardAndId(
    boardId,
    columnId
  );

  if (!column) {
    throw new Error("Column not found");
  }

  // Validate Task (IDOR Protection)
  const task = await taskRepository.findByColumnAndId(
    columnId,
    taskId
  );

  if (!task) {
    throw new Error("Task not found");
  }

  const transaction = await sequelize.transaction();

try {

    await taskRepository.deleteTask(
        task,
        transaction
    );

    await transaction.commit();

    return {
        message: "Task deleted successfully",
    };

} catch(error){

    await transaction.rollback();

    throw error;

}
};

const moveTask = async (
  workspaceId,
  projectId,
  boardId,
  taskId,
  targetColumnId
) => {

  const transaction = await sequelize.transaction();

  try {

    const project =
      await projectRepository.getProjectById(projectId);

    if (!project || project.workspaceId != workspaceId) {
      throw new Error("Project not found");
    }

    const board =
      await boardRepository.getBoardByProject(
        projectId,
        boardId
      );

    if (!board) {
      throw new Error("Board not found");
    }

    const targetColumn =
      await columnRepository.findByBoardAndId(
        boardId,
        targetColumnId
      );

    if (!targetColumn) {
      throw new Error("Target column not found");
    }

    const task =
      await taskRepository.findById(taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    const lastPosition =
      await taskRepository.getLastPosition(
        targetColumnId,
        transaction
      );

    await taskRepository.moveTask(
      task,
      targetColumnId,
      lastPosition + 1,
      transaction
    );

    await transaction.commit();

    return task;

  } catch (error) {

    await transaction.rollback();

    throw error;
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