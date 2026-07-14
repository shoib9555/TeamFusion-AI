const workspaceMemberRepository = require("../repositories/workspaceMemberRepository");

const getWorkspaceMembers = async (workspaceId) => {
  return await workspaceMemberRepository.getWorkspaceMembers(workspaceId);
};

const inviteMember = async (workspaceId, email, role) => {
  // Find user by email
  const user = await workspaceMemberRepository.findUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  // Check if already a member
  const existingMember =
    await workspaceMemberRepository.findWorkspaceMember(
      workspaceId,
      user.id
    );

  if (existingMember) {
    throw new Error("User is already a workspace member");
  }

  // Add member
  return await workspaceMemberRepository.createWorkspaceMember({
    workspaceId,
    userId: user.id,
    role,
  });
};

const updateMemberRole = async (
  workspaceId,
  userId,
  role
) => {

  const member =
    await workspaceMemberRepository.findMemberById(
      workspaceId,
      userId
    );

  if (!member) {
    throw new Error("Member not found");
  }

  return await workspaceMemberRepository.updateMemberRole(
    member,
    role
  );
};

const removeMember = async (
  workspaceId,
  userId
) => {

  const member =
    await workspaceMemberRepository.findMemberById(
      workspaceId,
      userId
    );

  if (!member) {
    throw new Error("Member not found");
  }

  await workspaceMemberRepository.deleteWorkspaceMember(member);

  return true;
};
module.exports = {
  getWorkspaceMembers,
  inviteMember,
  updateMemberRole,
  removeMember,
};