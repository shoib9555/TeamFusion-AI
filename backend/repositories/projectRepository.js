const Project = require("../models/Project");

const createProject = async (projectData) => {
  return await Project.create(projectData);
};

const getWorkspaceProjects = async (workspaceId) => {
  return await Project.findAll({
    where: { workspaceId },
    order: [["createdAt", "DESC"]],
  });
};

const getProjectById = async (id) => {
  return await Project.findByPk(id);
};

const findProjectByKey = async (workspaceId, key) => {
  return await Project.findOne({
    where: {
      workspaceId,
      key,
    },
  });
};

const updateProject = async (project, data) => {
  return await project.update(data);
};

const deleteProject = async (project) => {
  return await project.destroy();
};

const findByWorkspaceAndId = async (workspaceId, projectId) => {
  return await Project.findOne({
    where: {
      id: projectId,
      workspaceId,
    },
  });
};

module.exports = {
  createProject,
  getWorkspaceProjects,
  getProjectById,
  findProjectByKey,
  updateProject,
  deleteProject,
  findByWorkspaceAndId,
};