const Joi = require("joi");

const createTaskSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(255)
    .required(),

  description: Joi.string()
    .allow("", null),

  priority: Joi.string()
    .valid("LOW", "MEDIUM", "HIGH")
    .default("MEDIUM"),

  status: Joi.string()
    .valid("TODO", "IN_PROGRESS", "TESTING", "DONE")
    .default("TODO"),

  assigneeId: Joi.number()
    .integer()
    .allow(null),

  dueDate: Joi.date()
    .allow(null),

  storyPoints: Joi.number()
    .integer()
    .min(0)
    .allow(null),
});

const updateTaskSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(255),

  description: Joi.string()
    .allow("", null),

  priority: Joi.string()
    .valid("LOW", "MEDIUM", "HIGH"),

  status: Joi.string()
    .valid("TODO", "IN_PROGRESS", "TESTING", "DONE"),

  assigneeId: Joi.number()
    .integer()
    .allow(null),

  dueDate: Joi.date()
    .allow(null),

  storyPoints: Joi.number()
    .integer()
    .min(0)
    .allow(null),

  position: Joi.number()
    .integer()
    .min(1),

  columnId: Joi.number()
    .integer(),
}).min(1);

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};