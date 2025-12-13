const maintenanceTicket = require('../services/maintenanceTicketService');

class MaintenanceTicketController {
  async getAllMaintenance(req, res, next) {
    try {
      const maintenanceTickets = await maintenanceTicket.getAllMaintenances();
      res.json({
        maintenanceTickets,
        status: 'success'
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllMaintenanceTicketsByUserId(req, res, next) {
    try {
      const userId = parseInt(req.params.userId);
      const maintenanceTickets = await maintenanceTicket.getAllMaintenanceTicketsByUserId(userId);
      res.json({
        maintenanceTickets,
        status: 'success'
      });
    } catch (error) {
      if (error.message === 'No maintenance tickets found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async createMaintenanceTicket(req, res, next) {
    try {
      const userId = parseInt(req.params.userId);
      const { title, description, status } = req.body;
      const result = await maintenanceTicket.createMaintenanceTicket(userId, { title, description, status });

      res.json({
        status: 'success',
        message: 'Maintenance ticket created successfully',
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateMaintenanceTicketById(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const { title, description, status } = req.body;
      const maintenanceTicketUpdate = await maintenanceTicket.updateMaintenanceTicketById(id, { title, description, status });
      res.json({
        maintenanceTicketUpdate,
        status: 'success',
        message: 'Maintenance ticket updated successfully',
      });
    } catch (error) {
      if (error.message === 'Maintenance ticket not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async deleteMaintenanceTicketById(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      await maintenanceTicket.deleteMaintenanceTicketById(id);
      res.json({
        status: 'success',
        message: 'Maintenance ticket deleted successfully',
      });
    } catch (error) {
      if (error.message === 'Maintenance ticket not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async getMaintenanceTicketById(req, res, next) {
    try {
      const { id } = req.params;
      const maintenanceTicketSingle = await maintenanceTicket.getMaintenanceById(id);
      res.json({
        maintenanceTicketSingle,
        status: 'success',
      });
    } catch (error) {
      if (error.message === 'Maintenance ticket not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async countMaintenanceTicketNeedMaintenance(req, res, next) {
    try {
      const count = await maintenanceTicket.countMaintenanceTicketNeedMaintenance();
      res.json({
        status: 'success',
        count,
      });
    } catch (error) {
      next(error);
    }
  }

  async countMaintenanceTicketCompleted(req, res, next) {
    try {
      const count = await maintenanceTicket.countMaintenanceTicketCompleted();
      res.json({
        status: 'success',
        count,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MaintenanceTicketController();