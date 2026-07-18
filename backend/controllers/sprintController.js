const sprintService = require("../services/sprintService");

async function createSprint(req, res) {
  try {
    const { projectId } = req.params;

    const sprint = await sprintService.createSprint(
      projectId,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Sprint created successfully.",
      data: sprint,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function getSprints(req, res) {
  try {
    const { projectId } = req.params;

    const sprints = await sprintService.getSprints(projectId);

    res.status(200).json({
      success: true,
      data: sprints,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function getSprint(req, res) {
  try {
    const { projectId, sprintId } = req.params;

    const sprint = await sprintService.getSprint(
      projectId,
      sprintId
    );

    res.status(200).json({
      success: true,
      data: sprint,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateSprint(req, res) {
  try {
    const { projectId, sprintId } = req.params;

    const sprint = await sprintService.updateSprint(
      projectId,
      sprintId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Sprint updated successfully.",
      data: sprint,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function deleteSprint(req, res) {
  try {
    const { projectId, sprintId } = req.params;

    await sprintService.deleteSprint(
      projectId,
      sprintId
    );

    res.status(200).json({
      success: true,
      message: "Sprint deleted successfully.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function startSprint(req, res) {
  try {
    const { projectId, sprintId } = req.params;

    const sprint = await sprintService.startSprint(
      projectId,
      sprintId
    );

    res.status(200).json({
      success: true,
      message: "Sprint started successfully.",
      data: sprint,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function completeSprint(req, res) {
  try {
    const { projectId, sprintId } = req.params;

    const sprint = await sprintService.completeSprint(
      projectId,
      sprintId
    );

    res.status(200).json({
      success: true,
      message: "Sprint completed successfully.",
      data: sprint,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function addTaskToSprint(req, res) {
  try {
    const { projectId, sprintId, taskId } = req.params;

    const task = await sprintService.addTaskToSprint(
      projectId,
      sprintId,
      taskId
    );

    res.status(200).json({
      success: true,
      message: "Task added to sprint successfully.",
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function removeTaskFromSprint(req, res) {
  try {
    const { projectId, sprintId, taskId } = req.params;

    const task = await sprintService.removeTaskFromSprint(
      projectId,
      sprintId,
      taskId
    );

    res.status(200).json({
      success: true,
      message: "Task removed from sprint successfully.",
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
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