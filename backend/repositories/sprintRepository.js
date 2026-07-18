const { Sprint, Task } = require("../models");

async function createSprint(data, transaction = null) {
  return Sprint.create(data, { transaction });
}

async function findAllByProject(projectId) {
  return Sprint.findAll({
    where: { projectId },
    order: [["createdAt", "DESC"]],
  });
}

async function findById(id) {
  return Sprint.findByPk(id);
}

async function findByProjectAndId(projectId, sprintId) {
  return Sprint.findOne({
    where: {
      id: sprintId,
      projectId,
    },
    include: [
      {
        association: "project",
      },
    ],
  });
}

async function findActiveSprint(projectId) {
  return Sprint.findOne({
    where: {
      projectId,
      status: "ACTIVE",
    },
  });
}

async function updateSprint(sprint, data, transaction = null) {
  return sprint.update(data, { transaction });
}

async function deleteSprint(sprint, transaction = null) {
  return sprint.destroy({ transaction });
}

async function assignTaskToSprint(task, sprintId, transaction = null) {
  return task.update(
    { sprintId },
    { transaction }
  );
}

async function removeTaskFromSprint(task, transaction = null) {
  return task.update(
    { sprintId: null },
    { transaction }
  );
}

async function findTaskById(taskId) {
  return Task.findByPk(taskId);
}

async function findByProjectAndName(projectId, name) {
  return Sprint.findOne({
    where: {
      projectId,
      name,
    },
  });
}

module.exports = {
  createSprint,
  findAllByProject,
  findById,
  findByProjectAndId,
  findActiveSprint,
  updateSprint,
  deleteSprint,
  assignTaskToSprint,
  removeTaskFromSprint,
  findTaskById,
  findByProjectAndName,
};