const Workspace = require("../models/Workspace");

const createWorkspace = async (workspaceData) => {
  return await Workspace.create(workspaceData);
};

const getAllWorkspaces = async (ownerId) => {
  return await Workspace.findAll({
    where: {
      ownerId,
    },
    order: [["createdAt", "DESC"]],
  });
};

const getWorkspaceById = async (workspaceId, ownerId) => {
  return await Workspace.findOne({
    where: {
      id: workspaceId,
      ownerId,
    },
  });
};

const updateWorkspace = async (workspaceId, ownerId, updateData) => {
  const workspace = await Workspace.findOne({
    where: {
      id: workspaceId,
      ownerId,
    },
  });

  if (!workspace) return null;

  await workspace.update(updateData);
  return workspace;
};

const deleteWorkspace = async (workspaceId, ownerId) => {
  const workspace = await Workspace.findOne({
    where: {
      id: workspaceId,
      ownerId,
    },
  });

  if (!workspace) return null;

  await workspace.destroy();
  return true;
};

module.exports = {
  createWorkspace,
  getAllWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
};