const Joi = require("joi");

const createBoardSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),

  type: Joi.string()
    .valid("SCRUM", "KANBAN")
    .required(),
});

const updateBoardSchema = Joi.object({
  name: Joi.string().min(3).max(100),

  status: Joi.string()
    .valid("ACTIVE", "ARCHIVED"),
});

module.exports = {
  createBoardSchema,
  updateBoardSchema,
};