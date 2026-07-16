const attachmentService = require("../services/attachmentService");

// -----------------------------------------
// Upload Attachment
// -----------------------------------------
const uploadAttachment = async (req, res, next) => {
  try {
    const attachment =
      await attachmentService.uploadAttachment(
        req.params.workspaceId,
        req.params.projectId,
        req.params.boardId,
        req.params.columnId,
        req.params.taskId,
        req.user.id,
        req.file
      );

    res.status(201).json({
      success: true,
      message: "Attachment uploaded successfully",
      data: attachment,
    });
  } catch (error) {
    next(error);
  }
};

// -----------------------------------------
// Get Attachments
// -----------------------------------------
const getAttachments = async (req, res, next) => {
  try {
    const attachments =
      await attachmentService.getTaskAttachments(
        req.params.workspaceId,
        req.params.projectId,
        req.params.boardId,
        req.params.columnId,
        req.params.taskId
      );

    res.status(200).json({
      success: true,
      data: attachments,
    });
  } catch (error) {
    next(error);
  }
};

// -----------------------------------------
// Download Attachment
// -----------------------------------------
const downloadAttachment = async (
  req,
  res,
  next
) => {
  try {
    const attachment =
      await attachmentService.downloadAttachment(
        req.params.workspaceId,
        req.params.projectId,
        req.params.boardId,
        req.params.columnId,
        req.params.taskId,
        req.params.attachmentId
      );

    return res.download(
      attachment.filePath,
      attachment.originalName
    );
  } catch (error) {
    next(error);
  }
};

// -----------------------------------------
// Delete Attachment
// -----------------------------------------
const deleteAttachment = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await attachmentService.deleteAttachment(
        req.params.workspaceId,
        req.params.projectId,
        req.params.boardId,
        req.params.columnId,
        req.params.taskId,
        req.params.attachmentId,
        req.user.id,
        req.workspaceMember
      );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadAttachment,
  getAttachments,
  downloadAttachment,
  deleteAttachment,
};