const fs = require("fs");

const attachmentRepository = require("../repositories/attachmentRepository");
const taskRepository = require("../repositories/taskRepository");
const columnRepository = require("../repositories/columnRepository");
const boardRepository = require("../repositories/boardRepository");
const projectRepository = require("../repositories/projectRepository");

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
  const project =
    await projectRepository.findByWorkspaceAndId(
      workspaceId,
      projectId
    );

  if (!project) {
    throw new Error("Project not found");
  }

  const board =
    await boardRepository.getBoardByProject(
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
// Upload Attachment
// -----------------------------------------
const uploadAttachment = async (
  workspaceId,
  projectId,
  boardId,
  columnId,
  taskId,
  userId,
  file
) => {
  // Validate hierarchy
  await validateHierarchy(
    workspaceId,
    projectId,
    boardId,
    columnId,
    taskId
  );

  // Check if file exists
  if (!file) {
    throw new Error("No file uploaded");
  }

  // Save attachment
  return await attachmentRepository.createAttachment({
    taskId,
    userId,
    fileName: file.filename,
    originalName: file.originalname,
    filePath: file.path,
    mimeType: file.mimetype,
    fileSize: file.size,
  });
};

// -----------------------------------------
// Get Attachments
// -----------------------------------------
const getTaskAttachments = async (
  workspaceId,
  projectId,
  boardId,
  columnId,
  taskId
) => {

  // Validate hierarchy
  await validateHierarchy(
    workspaceId,
    projectId,
    boardId,
    columnId,
    taskId
  );

  // Fetch attachments
  return await attachmentRepository.findAllByTask(
    taskId
  );
};

// -----------------------------------------
// Download Attachment
// -----------------------------------------
const downloadAttachment = async (
  workspaceId,
  projectId,
  boardId,
  columnId,
  taskId,
  attachmentId
) => {

  // Validate hierarchy
  await validateHierarchy(
    workspaceId,
    projectId,
    boardId,
    columnId,
    taskId
  );

  // Find attachment
  const attachment =
    await attachmentRepository.findById(
      attachmentId
    );

  if (!attachment) {
    throw new Error("Attachment not found");
  }

  // IDOR Protection
  if (attachment.taskId != taskId) {
    throw new Error("Attachment not found");
  }

  return attachment;
};

// -----------------------------------------
// Delete Attachment
// -----------------------------------------
const deleteAttachment = async (
  workspaceId,
  projectId,
  boardId,
  columnId,
  taskId,
  attachmentId,
  userId,
  workspaceMember
) => {

  // Validate hierarchy
  await validateHierarchy(
    workspaceId,
    projectId,
    boardId,
    columnId,
    taskId
  );

  // Find attachment
  const attachment =
    await attachmentRepository.findById(
      attachmentId
    );

  if (!attachment) {
    throw new Error("Attachment not found");
  }

  // IDOR Protection
  if (attachment.taskId != taskId) {
    throw new Error("Attachment not found");
  }

  // MEMBER can delete only their own attachment
  if (
    workspaceMember.role === "MEMBER" &&
    attachment.userId !== userId
  ) {
    throw new Error(
      "You can delete only your own attachments"
    );
  }

  // Delete physical file
  if (
    attachment.filePath &&
    fs.existsSync(attachment.filePath)
  ) {
    fs.unlinkSync(attachment.filePath);
  }

  // Delete database record
  await attachmentRepository.deleteAttachment(
    attachment
  );

  return {
    message: "Attachment deleted successfully",
  };
};

module.exports = {
  uploadAttachment,
  getTaskAttachments,
  downloadAttachment,
  deleteAttachment,
};