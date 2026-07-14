const Joi = require("joi");

const createColumnSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required(),

  position: Joi.number()
    .integer()
    .min(1)
    .optional(),
});

const updateColumnSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .optional(),

  position: Joi.number()
    .integer()
    .min(1)
    .optional(),
});

module.exports = {
  createColumnSchema,
  updateColumnSchema,
};