const Joi = require('joi');

const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  email: Joi.string().email(),
  phone_number: Joi.string(),
  password: Joi.string(),
  role: Joi.string().valid('user', 'admin'),
});

const userIdSchema = Joi.object({
  id: Joi.number().integer().positive().required()
});

module.exports = {
  updateUserSchema,
  userIdSchema
};