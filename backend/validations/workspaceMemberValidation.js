const Joi = require("joi");

const inviteMemberSchema = Joi.object({
  email: Joi.string().email().required(),

  role: Joi.string()
    .valid("OWNER", "ADMIN", "MEMBER")
    .default("MEMBER"),
});

const updateMemberRoleSchema = Joi.object({
  role: Joi.string()
    .valid("OWNER", "ADMIN", "MEMBER")
    .required(),
});

module.exports = {
  inviteMemberSchema,
  updateMemberRoleSchema,
};