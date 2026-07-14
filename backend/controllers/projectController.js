const projectService = require("../services/projectService");
const {
  createProjectSchema,
  updateProjectSchema,
} = require("../validations/projectValidation");

// Create Project
const createProject = async (req, res) => {
  try {
    const { error } = createProjectSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const project = await projectService.createProject(
      req.params.workspaceId,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Projects
const getWorkspaceProjects = async (req, res) => {
  try {
    const projects = await projectService.getWorkspaceProjects(
      req.params.workspaceId
    );

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get Single Project
const getProjectById = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id);

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

// Update Project
const updateProject = async (req, res) => {
  try {
    const { error } = updateProjectSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const project = await projectService.updateProject(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete Project
const deleteProject = async (req, res) => {
  try {
    await projectService.deleteProject(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createProject,
  getWorkspaceProjects,
  getProjectById,
  updateProject,
  deleteProject,
};