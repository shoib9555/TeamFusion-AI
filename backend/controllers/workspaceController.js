const workspaceService = require("../services/workspaceService");
const { workspaceSchema } = require("../validations/workspaceValidation");

const createWorkspace = async (req, res) => {
  try {
    // Validate request body
    const { error } = workspaceSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Extract data
    const { name, description } = req.body;

    // Get logged-in user's ID from JWT middleware
    const ownerId = req.user.id;

    // Create workspace
    const workspace = await workspaceService.createWorkspace({
      name,
      description,
      ownerId,
    });

    return res.status(201).json({
      success: true,
      message: "Workspace created successfully",
      data: workspace,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllWorkspaces = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const workspaces = await workspaceService.getAllWorkspaces(ownerId);

    return res.status(200).json({
      success: true,
      count: workspaces.length,
      data: workspaces,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getWorkspaceById = async (req, res) => {
  try {
    const workspaceId = req.params.id;
    const ownerId = req.user.id;

    const workspace = await workspaceService.getWorkspaceById(
      workspaceId,
      ownerId
    );

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: workspace,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateWorkspace = async (req, res) => {
  try {
    const workspaceId = req.params.id;
    const ownerId = req.user.id;

    const { error } = workspaceSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const workspace = await workspaceService.updateWorkspace(
      workspaceId,
      ownerId,
      req.body
    );

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Workspace updated successfully",
      data: workspace,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteWorkspace = async (req, res) => {
  try {
    const workspaceId = req.params.id;
    const ownerId = req.user.id;

    const deleted = await workspaceService.deleteWorkspace(
      workspaceId,
      ownerId
    );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Workspace deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  createWorkspace,
  getAllWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
};