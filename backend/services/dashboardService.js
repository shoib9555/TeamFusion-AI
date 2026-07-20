const dashboardRepository = require("../repositories/dashboardRepository");

const getWorkspaceDashboard = async (workspaceId) => {

  const [
    totalProjects,
    totalBoards,
    totalMembers,
    totalTasks,
    activeSprints,
    completedSprints,
  ] = await Promise.all([
    dashboardRepository.countProjects(workspaceId),
    dashboardRepository.countBoards(workspaceId),
    dashboardRepository.countMembers(workspaceId),
    dashboardRepository.countTasks(workspaceId),
    dashboardRepository.countActiveSprints(workspaceId),
    dashboardRepository.countCompletedSprints(workspaceId),
  ]);

  return {
    totalProjects,
    totalBoards,
    totalMembers,
    totalTasks,
    activeSprints,
    completedSprints,
  };
};

const getProjectDashboard = async (projectId) => {

  const [
    totalTasks,
    todo,
    inProgress,
    testing,
    done,
  ] = await Promise.all([
    dashboardRepository.countProjectTasks(projectId),
    dashboardRepository.countTasksByStatus(projectId, "TODO"),
    dashboardRepository.countTasksByStatus(projectId, "IN_PROGRESS"),
    dashboardRepository.countTasksByStatus(projectId, "TESTING"),
    dashboardRepository.countTasksByStatus(projectId, "DONE"),
  ]);

  const completionPercentage =
    totalTasks === 0
      ? 0
      : Number(((done / totalTasks) * 100).toFixed(2));

  return {
    totalTasks,
    todo,
    inProgress,
    testing,
    done,
    completionPercentage,
  };
};

const getSprintDashboard = async (sprintId) => {

  const [
    totalTasks,
    completedTasks,
    storyPointsCompleted,
    storyPointsRemaining,
  ] = await Promise.all([
    dashboardRepository.countSprintTasks(sprintId),
    dashboardRepository.countCompletedSprintTasks(sprintId),
    dashboardRepository.getCompletedStoryPoints(sprintId),
    dashboardRepository.getRemainingStoryPoints(sprintId),
  ]);

  const remainingTasks = totalTasks - completedTasks;

  const progress =
    totalTasks === 0
      ? 0
      : Number(((completedTasks / totalTasks) * 100).toFixed(2));

  return {
    totalTasks,
    completedTasks,
    remainingTasks,
    storyPointsCompleted,
    storyPointsRemaining,
    progress,
  };
};

const getUserDashboard = async (userId) => {

  const [
    assignedTasks,
    completedTasks,
    overdueTasks,
    tasksDueToday,
  ] = await Promise.all([
    dashboardRepository.countAssignedTasks(userId),
    dashboardRepository.countCompletedTasks(userId),
    dashboardRepository.countOverdueTasks(userId),
    dashboardRepository.countTasksDueToday(userId),
  ]);

  return {
    assignedTasks,
    completedTasks,
    overdueTasks,
    tasksDueToday,
  };
};
const getProjectStatusAnalytics = async (projectId) => {
  return await dashboardRepository.getTasksByStatus(projectId);
};

const getProjectPriorityAnalytics = async (projectId) => {
  return await dashboardRepository.getTasksByPriority(projectId);
};

const getProjectAssigneeAnalytics = async (projectId) => {
  return await dashboardRepository.getTasksByAssignee(projectId);
};

const getProjectOverdueTasks = async (projectId) => {
  return await dashboardRepository.getOverdueTasks(projectId);
};

const getProjectUpcomingTasks = async (projectId) => {
  return await dashboardRepository.getUpcomingTasks(projectId);
};

const getProjectSprintVelocity = async (projectId) => {
  return await dashboardRepository.getSprintVelocity(projectId);
};

const getProjectBurndown = async (projectId) => {
  return await dashboardRepository.getBurndownData(projectId);
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