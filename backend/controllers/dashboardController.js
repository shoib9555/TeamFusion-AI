const dashboardService = require("../services/dashboardService");

const getWorkspaceDashboard = async (req, res, next) => {
    try {

        const { workspaceId } = req.params;

        const dashboard =
            await dashboardService.getWorkspaceDashboard(workspaceId);

        return res.status(200).json({
            success: true,
            data: dashboard,
        });

    } catch (error) {
        next(error);
    }
};

const getProjectDashboard = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const dashboard = await dashboardService.getProjectDashboard(projectId);

    return res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
};

const getSprintDashboard = async (req, res, next) => {
  try {
    const { sprintId } = req.params;

    const dashboard = await dashboardService.getSprintDashboard(sprintId);

    return res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
};

const getUserDashboard = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const dashboard = await dashboardService.getUserDashboard(userId);

    return res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
};

const getProjectStatusAnalytics = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const analytics =
      await dashboardService.getProjectStatusAnalytics(projectId);

    return res.status(200).json({
      success: true,
      data: analytics,
    });

  } catch (error) {
    next(error);
  }
};

const getProjectPriorityAnalytics = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const analytics =
      await dashboardService.getProjectPriorityAnalytics(projectId);

    return res.status(200).json({
      success: true,
      data: analytics,
    });

  } catch (error) {
    next(error);
  }
};
const getProjectAssigneeAnalytics = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const analytics =
      await dashboardService.getProjectAssigneeAnalytics(projectId);

    return res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};

const getProjectOverdueTasks = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const tasks =
      await dashboardService.getProjectOverdueTasks(projectId);

    const result = tasks.map((task) => ({
      id: task.id,
      title: task.title,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate,
      assignee: task.assignee
        ? `${task.assignee.firstName} ${task.assignee.lastName}`
        : "Unassigned",
    }));

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {
    next(error);
  }
};

const getProjectUpcomingTasks = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const tasks =
      await dashboardService.getProjectUpcomingTasks(projectId);

    const result = tasks.map((task) => ({
      id: task.id,
      title: task.title,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate,
      assignee: task.assignee
        ? `${task.assignee.firstName} ${task.assignee.lastName}`
        : "Unassigned",
    }));

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {
    next(error);
  }
};

const getProjectSprintVelocity = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const velocity =
      await dashboardService.getProjectSprintVelocity(projectId);

    return res.status(200).json({
      success: true,
      data: velocity,
    });

  } catch (error) {
    next(error);
  }
};

const getProjectBurndown = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const burndown =
      await dashboardService.getProjectBurndown(projectId);

    return res.status(200).json({
      success: true,
      data: burndown,
    });

  } catch (error) {
    next(error);
  }
};
module.exports = {
  getWorkspaceDashboard,
  getProjectDashboard,
  getSprintDashboard,
  getUserDashboard,
  getProjectStatusAnalytics,
  getProjectPriorityAnalytics,
  getProjectAssigneeAnalytics,
  getProjectOverdueTasks,
  getProjectUpcomingTasks,
  getProjectSprintVelocity,
  getProjectBurndown,
};