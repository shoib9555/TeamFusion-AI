const Joi = require("joi");

const createSprintSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required(),

  goal: Joi.string()
    .trim()
    .allow("", null),

  startDate: Joi.date()
    .allow(null),

  endDate: Joi.date()
    .min(Joi.ref("startDate"))
    .allow(null),
});

const updateSprintSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(100),

  goal: Joi.string()
    .trim()
    .allow("", null),

  status: Joi.string()
    .valid("PLANNED", "ACTIVE", "COMPLETED"),

  startDate: Joi.date()
    .allow(null),

  endDate: Joi.date()
    .min(Joi.ref("startDate"))
    .allow(null),
});

module.exports = {
  createSprintSchema,
  updateSprintSchema,
};