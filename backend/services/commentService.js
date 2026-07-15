const commentRepository = require("../repositories/commentRepository");
const taskRepository = require("../repositories/taskRepository");
const columnRepository = require("../repositories/columnRepository");
const boardRepository = require("../repositories/boardRepository");
const projectRepository = require("../repositories/projectRepository");

const {
  createCommentSchema,
  updateCommentSchema,
} = require("../validations/commentValidation");

// -----------------------------------------
// Common Hierarchy Validation
// -----------------------------------------
const validateHierarchy = async (
  workspaceId,
  projectId,
  boardId,
  columnId,
  taskId
) => {
  const project = await projectRepository.getProjectById(projectId);

  if (!project || project.workspaceId != workspaceId) {
    throw new Error("Project not found");
  }

  const board = await boardRepository.getBoardByProject(
    projectId,
    boardId
  );

  if (!board) {
    throw new Error("Board not found");
  }

  const column =
    await columnRepository.findByBoardAndId(
      boardId,
      columnId
    );

  if (!column) {
    throw new Error("Column not found");
  }

  const task =
    await taskRepository.findByColumnAndId(
      columnId,
      taskId
    );

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};

// -----------------------------------------
// Create Comment
// -----------------------------------------
const createComment = async (
  workspaceId,
  projectId,
  boardId,
  columnId,
  taskId,
  userId,
  commentData
) => {

  const { error } =
    createCommentSchema.validate(commentData);

  if (error) {
    throw new Error(error.details[0].message);
  }

  await validateHierarchy(
    workspaceId,
    projectId,
    boardId,
    columnId,
    taskId
  );

  return await commentRepository.create({
    taskId,
    userId,
    content: commentData.content,
  });
};

// -----------------------------------------
// Get Comments
// -----------------------------------------
const getComments = async (
  workspaceId,
  projectId,
  boardId,
  columnId,
  taskId
) => {

  await validateHierarchy(
    workspaceId,
    projectId,
    boardId,
    columnId,
    taskId
  );

  return await commentRepository.findByTaskId(
    taskId
  );
};

// -----------------------------------------
// Update Comment
// -----------------------------------------
const updateComment = async (
    workspaceId,
    projectId,
    boardId,
    columnId,
    taskId,
    commentId,
    userId,
    workspaceMember,
    commentData
) => {

  const { error } =
    updateCommentSchema.validate(commentData);

  if (error) {
    throw new Error(error.details[0].message);
  }

  await validateHierarchy(
    workspaceId,
    projectId,
    boardId,
    columnId,
    taskId
  );

const comment =
    await commentRepository.findByTaskAndId(
        taskId,
        commentId
    );

  if (!comment) {
    throw new Error("Comment not found");
  }

if (
    workspaceMember.role === "MEMBER" &&
    comment.userId !== userId
) {
    throw new Error(
        "You can update only your own comments"
    );
}

  return await commentRepository.update(
    comment,
    {
      content: commentData.content,
    }
  );
};

// -----------------------------------------
// Delete Comment
// -----------------------------------------
const deleteComment = async (
    workspaceId,
    projectId,
    boardId,
    columnId,
    taskId,
    commentId,
    userId,
    workspaceMember
) => {

  await validateHierarchy(
    workspaceId,
    projectId,
    boardId,
    columnId,
    taskId
  );

 const comment =
    await commentRepository.findByTaskAndId(
        taskId,
        commentId
    );

  if (!comment) {
    throw new Error("Comment not found");
  }

if (
    workspaceMember.role === "MEMBER" &&
    comment.userId !== userId
) {
    throw new Error(
        "You can delete only your own comments"
    );
}

  await commentRepository.remove(comment);

  return {
    message: "Comment deleted successfully",
  };
};

module.exports = {
  createComment,
  getComments,
  updateComment,
  deleteComment,
};