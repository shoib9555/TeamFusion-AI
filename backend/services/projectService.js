const projectRepository = require("../repositories/projectRepository");
const Workspace = require("../models/Workspace");

// Create Project
const createProject = async (workspaceId, projectData) => {
  // Check if workspace exists
  const workspace = await Workspace.findByPk(workspaceId);

  if (!workspace) {
    throw new Error("Workspace not found");
  }

  // Check if project key already exists in this workspace
  const existingProject = await projectRepository.findProjectByKey(
    workspaceId,
    projectData.key
  );

  if (existingProject) {
    throw new Error("Project key already exists in this workspace");
  }

  return await projectRepository.createProject({
    workspaceId,
    ...projectData,
  });
};

// Get All Projects
const getWorkspaceProjects = async (workspaceId) => {
  return await projectRepository.getWorkspaceProjects(workspaceId);
};

// Get Single Project
const getProjectById = async (id) => {
  const project = await projectRepository.getProjectById(id);

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};

// Update Project
const updateProject = async (id, data) => {
  const project = await projectRepository.getProjectById(id);

  if (!project) {
    throw new Error("Project not found");
  }

  // Check duplicate key only if key is being changed
  if (data.key && data.key !== project.key) {
    const existingProject = await projectRepository.findProjectByKey(
      project.workspaceId,
      data.key
    );

    if (existingProject) {
      throw new Error("Project key already exists");
    }
  }

  return await projectRepository.updateProject(project, data);
};

// Delete Project
const deleteProject = async (id) => {
  const project = await projectRepository.getProjectById(id);

  if (!project) {
    throw new Error("Project not found");
  }

  return await projectRepository.deleteProject(project);
};

module.exports = {
  createProject,
  getWorkspaceProjects,
  getProjectById,
  updateProject,
  deleteProject,
};