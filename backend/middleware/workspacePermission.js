const workspaceMemberRepository = require("../repositories/workspaceMemberRepository");

const authorizeWorkspaceRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const workspaceId = req.params.workspaceId;
      const userId = req.user.id;

      const member = await workspaceMemberRepository.getMemberRole(
        workspaceId,
        userId
      );

      if (!member) {
        return res.status(403).json({
          success: false,
          message: "You are not a member of this workspace",
        });
      }

      if (!allowedRoles.includes(member.role)) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to perform this action",
        });
      }

      // Save member info for later use
      req.workspaceMember = member;

      next();
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
};

module.exports = {
  authorizeWorkspaceRole,
};