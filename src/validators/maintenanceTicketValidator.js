const Joi = require('joi');

const maintenanceTicketSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid('need_maintenance', 'in_progress', 'completed').default('need_maintenance'),
});

const maintenanceTicketUpdateSchame = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  status: Joi.string().valid('need_maintenance', 'in_progress', 'completed'),
});

const statusMaintenanceSchema = Joi.object({
  status: Joi.string().valid('need_maintenance', 'in_progress', 'completed').required(),
});

module.exports = {
  maintenanceTicketSchema,
  maintenanceTicketUpdateSchame,
  statusMaintenanceSchema
};