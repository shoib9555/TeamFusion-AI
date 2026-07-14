const User = require("../models/User");
const WorkspaceMember = require("../models/WorkspaceMember");


const getWorkspaceMembers = async (workspaceId) => {
  return await WorkspaceMember.findAll({
    where: {
      workspaceId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName", "email", "profileImage"],
      },
    ],
    order: [["createdAt", "ASC"]],
  });
};
const findUserByEmail = async (email) => {
  return await User.findOne({
    where: { email },
  });
};

const findWorkspaceMember = async (workspaceId, userId) => {
  return await WorkspaceMember.findOne({
    where: {
      workspaceId,
      userId,
    },
  });
};

const createWorkspaceMember = async (data) => {
  return await WorkspaceMember.create(data);
};

const findMemberById = async (workspaceId, userId) => {
  return await WorkspaceMember.findOne({
    where: {
      workspaceId,
      userId,
    },
  });
};

const updateMemberRole = async (member, role) => {
  member.role = role;
  await member.save();
  return member;
};

const deleteWorkspaceMember = async (member) => {
  await member.destroy();
  return true;
};
const getMemberRole = async (workspaceId, userId) => {
  return await WorkspaceMember.findOne({
    where: {
      workspaceId,
      userId,
    },
  });
};
module.exports = {
  getWorkspaceMembers,
  findUserByEmail,
  findWorkspaceMember,
  createWorkspaceMember,
  findMemberById,
  updateMemberRole,
  deleteWorkspaceMember,
  getMemberRole,
};