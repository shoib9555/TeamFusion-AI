const sequelize = require("../config/db");
const sprintRepository = require("../repositories/sprintRepository");
const projectRepository = require("../repositories/projectRepository");
const taskRepository = require("../repositories/taskRepository");
const {
  createSprintSchema,
  updateSprintSchema,
} = require("../validations/sprintValidation");

async function createSprint(projectId, sprintData) {
  const { error } = createSprintSchema.validate(sprintData);

  if (error) {
    throw new Error(error.details[0].message);
  }

  const project = await projectRepository.getProjectById(projectId);

  if (!project) {
    throw new Error("Project not found.");
  }

  const existingSprint =
  await sprintRepository.findByProjectAndName(
    projectId,
    sprintData.name
  );

if (existingSprint) {
  throw new Error(
    "Sprint name already exists in this project."
  );
}

  return sprintRepository.createSprint({
    projectId,
    ...sprintData,
  });
}

async function getSprints(projectId) {
  return sprintRepository.findAllByProject(projectId);
}

async function getSprint(projectId, sprintId) {
  const sprint = await sprintRepository.findByProjectAndId(projectId, sprintId);

  if (!sprint) {
    throw new Error("Sprint not found.");
  }

  return sprint;
}

async function updateSprint(projectId, sprintId, updateData) {
  // Validate request body
  const { error } = updateSprintSchema.validate(updateData);

  if (error) {
    throw new Error(error.details[0].message);
  }

  // Check if sprint exists in the project
  const sprint = await sprintRepository.findByProjectAndId(
    projectId,
    sprintId
  );

  if (!sprint) {
    throw new Error("Sprint not found.");
  }

  // Check for duplicate sprint name (only if name is being changed)
  if (
    updateData.name &&
    updateData.name !== sprint.name
  ) {
    const existingSprint =
      await sprintRepository.findByProjectAndName(
        projectId,
        updateData.name
      );

    if (
      existingSprint &&
      existingSprint.id !== sprint.id
    ) {
      throw new Error(
        "Sprint name already exists in this project."
      );
    }
  }

  // Update sprint
  return sprintRepository.updateSprint(
    sprint,
    updateData
  );
}

async function deleteSprint(projectId, sprintId) {
  const sprint = await sprintRepository.findByProjectAndId(projectId, sprintId);

  if (!sprint) {
    throw new Error("Sprint not found.");
  }

  return sprintRepository.deleteSprint(sprint);
}

async function startSprint(projectId, sprintId) {
  const transaction = await sequelize.transaction();

  try {
    const sprint = await sprintRepository.findByProjectAndId(
      projectId,
      sprintId,
    );

    if (!sprint) {
      throw new Error("Sprint not found.");
    }

    const activeSprint = await sprintRepository.findActiveSprint(projectId);

    if (activeSprint && activeSprint.id !== sprint.id) {
      throw new Error("Another sprint is already active.");
    }

    await sprintRepository.updateSprint(
      sprint,
      {
        status: "ACTIVE",
      },
      transaction,
    );

    await transaction.commit();

    return sprint;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function completeSprint(projectId, sprintId) {
  const sprint = await sprintRepository.findByProjectAndId(projectId, sprintId);

  if (!sprint) {
    throw new Error("Sprint not found.");
  }

  return sprintRepository.updateSprint(sprint, {
    status: "COMPLETED",
  });
}

async function addTaskToSprint(projectId, sprintId, taskId) {
  const transaction = await sequelize.transaction();

  try {
    const sprint = await sprintRepository.findByProjectAndId(
      projectId,
      sprintId,
    );

    if (!sprint) {
      throw new Error("Sprint not found.");
    }

    const task = await taskRepository.findTaskByProject(projectId, taskId);

    if (!task) {
      throw new Error("Task not found in this project.");
    }

    await sprintRepository.assignTaskToSprint(task, sprint.id, transaction);

    await transaction.commit();

    return task;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function removeTaskFromSprint(projectId, sprintId, taskId) {
  const transaction = await sequelize.transaction();

  try {
    const sprint = await sprintRepository.findByProjectAndId(
      projectId,
      sprintId,
    );

    if (!sprint) {
      throw new Error("Sprint not found.");
    }

   const task = await taskRepository.findTaskByProject(projectId, taskId);

    if (!task) {
      throw new Error("Task not found in this project.");
    }

    await sprintRepository.removeTaskFromSprint(task, transaction);

    await transaction.commit();

    return task;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

module.exports = {
  createSprint,
  getSprints,
  getSprint,
  updateSprint,
  deleteSprint,
  startSprint,
  completeSprint,
  addTaskToSprint,
  removeTaskFromSprint,
};
