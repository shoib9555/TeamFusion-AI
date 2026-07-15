const commentService = require("../services/commentService");

// Create Comment
const createComment = async (req, res) => {
  try {
    const {
      workspaceId,
      projectId,
      boardId,
      columnId,
      taskId,
    } = req.params;

    const comment = await commentService.createComment(
      workspaceId,
      projectId,
      boardId,
      columnId,
      taskId,
      req.user.id,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data: comment,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Comments
const getComments = async (req, res) => {
  try {
    const {
      workspaceId,
      projectId,
      boardId,
      columnId,
      taskId,
    } = req.params;

    const comments = await commentService.getComments(
      workspaceId,
      projectId,
      boardId,
      columnId,
      taskId
    );

    return res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Comment
const updateComment = async (req, res) => {
  try {
    const {
      workspaceId,
      projectId,
      boardId,
      columnId,
      taskId,
      commentId,
    } = req.params;

    const comment = await commentService.updateComment(
      workspaceId,
      projectId,
      boardId,
      columnId,
      taskId,
      commentId,
      req.user.id,
      req.workspaceMember,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      data: comment,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Comment
const deleteComment = async (req, res) => {
  try {
    const {
      workspaceId,
      projectId,
      boardId,
      columnId,
      taskId,
      commentId,
    } = req.params;

    const result = await commentService.deleteComment(
      workspaceId,
      projectId,
      boardId,
      columnId,
      taskId,
      commentId,
      req.user.id,
      req.workspaceMember
    );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createComment,
  getComments,
  updateComment,
  deleteComment,
};