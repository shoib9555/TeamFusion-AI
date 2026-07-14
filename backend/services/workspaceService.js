const WorkspaceMember = require("../models/WorkspaceMember");
const workspaceRepository = require("../repositories/workspaceRepository");

const createWorkspace = async (workspaceData) => {
  const workspace = await workspaceRepository.createWorkspace(workspaceData);

  await WorkspaceMember.create({
    workspaceId: workspace.id,
    userId: workspace.ownerId,
    role: "OWNER",
  });

  return workspace;
};

const getAllWorkspaces = async (ownerId) => {
  return await workspaceRepository.getAllWorkspaces(ownerId);
};

const getWorkspaceById = async (workspaceId, ownerId) => {
  return await workspaceRepository.getWorkspaceById(workspaceId, ownerId);
};

const updateWorkspace = async (workspaceId, ownerId, updateData) => {
  return await workspaceRepository.updateWorkspace(
    workspaceId,
    ownerId,
    updateData
  );
};

const deleteWorkspace = async (workspaceId, ownerId) => {
  return await workspaceRepository.deleteWorkspace(
    workspaceId,
    ownerId
  );
};

module.exports = {
  createWorkspace,
  getAllWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
};