const Joi = require('joi');

const assignMaintenanceTaskSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  maintenanceTicketId: Joi.number().integer().positive().required(),
});

module.exports = {
  assignMaintenanceTaskSchema,
};