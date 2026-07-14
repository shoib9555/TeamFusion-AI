const Joi = require("joi");

const createProjectSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required(),

  key: Joi.string()
    .uppercase()
    .min(2)
    .max(10)
    .required(),

  description: Joi.string()
    .allow("", null),

  type: Joi.string()
    .valid("SCRUM", "KANBAN")
    .required(),
});

const updateProjectSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100),

  key: Joi.string()
    .uppercase()
    .min(2)
    .max(10),

  description: Joi.string()
    .allow("", null),

  type: Joi.string()
    .valid("SCRUM", "KANBAN"),

  status: Joi.string()
    .valid("ACTIVE", "ARCHIVED"),
});

module.exports = {
  createProjectSchema,
  updateProjectSchema,
};