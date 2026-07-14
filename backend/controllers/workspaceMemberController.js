const workspaceMemberService = require("../services/workspaceMemberService");
const {
  inviteMemberSchema,
  updateMemberRoleSchema,
} = require("../validations/workspaceMemberValidation");
const getWorkspaceMembers = async (req, res) => {
  try {
    const members = await workspaceMemberService.getWorkspaceMembers(
      req.params.workspaceId,
    );

    return res.status(200).json({
      success: true,
      data: members,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const inviteMember = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = inviteMemberSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    
    if (!value) {
      return res.status(400).json({
        success: false,
        message: "Request body is required",
      });
    }

    const { email, role } = value;

    const member = await workspaceMemberService.inviteMember(
      req.params.workspaceId,
      email,
      role,
    );

    return res.status(201).json({
      success: true,
      message: "Member invited successfully",
      data: member,
    });
  } catch (error) {
    if (
      error.message === "User not found" ||
      error.message === "User is already a workspace member"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateMemberRole = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = updateMemberRoleSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const member = await workspaceMemberService.updateMemberRole(
      req.params.workspaceId,
      req.params.userId,
      value.role,
    );

    return res.status(200).json({
      success: true,
      message: "Member role updated successfully",
      data: member,
    });
  } catch (error) {
    if (error.message === "Member not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const removeMember = async (req, res) => {
  try {
    await workspaceMemberService.removeMember(
      req.params.workspaceId,
      req.params.userId,
    );

    return res.status(200).json({
      success: true,
      message: "Member removed successfully",
    });
  } catch (error) {
    if (error.message === "Member not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getWorkspaceMembers,
  inviteMember,
  updateMemberRole,
  removeMember,
};
