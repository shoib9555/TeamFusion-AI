const Joi = require("joi");

const createCommentSchema = Joi.object({
  content: Joi.string()
    .trim()
    .min(1)
    .max(5000)
    .required()
    .messages({
      "string.empty": "Comment content is required",
      "string.min": "Comment must contain at least 1 character",
      "string.max": "Comment cannot exceed 5000 characters",
      "any.required": "Comment content is required",
    }),
});

const updateCommentSchema = Joi.object({
  content: Joi.string()
    .trim()
    .min(1)
    .max(5000)
    .required()
    .messages({
      "string.empty": "Comment content is required",
      "string.min": "Comment must contain at least 1 character",
      "string.max": "Comment cannot exceed 5000 characters",
      "any.required": "Comment content is required",
    }),
});

module.exports = {
  createCommentSchema,
  updateCommentSchema,
};