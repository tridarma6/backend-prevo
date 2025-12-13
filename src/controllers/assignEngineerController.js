const assignEngineerTaskService = require('../services/assignEngineerTaskService');

class AssignEngineerController {
  async getAssignEngineer(req, res, next) {
    try {
      const { userId } = req.params;
      const assignedEngineers = await assignEngineerTaskService.getAssignedEngineers(userId);
      res.json({
        status: 'success',
        assignedEngineers,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateAssignedEngineerTicketMaintenance(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updatedTicket = await assignEngineerTaskService.updateAssignedEngineerTicketMaintenance(id, { status });
      res.json({
        status: 'success',
        message: 'Maintenance ticket updated successfully',
        updatedTicket,
      });
    } catch (error) {
      if (error.message === 'Maintenance ticket not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async getAssignedEngineerTicketById(req, res, next) {
    try {
      const { id } = req.params;
      const assignedEngineerTicket = await assignEngineerTaskService.getAssignedEngineerTicketStatusById(id);
      res.json({
        status: 'success',
        assignedEngineerTicket,
      });
    } catch (error) {
      if (error.message === 'Maintenance ticket not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async countMaintenanceTicketNeedMaintenanceByUserId(req, res, next) {
    try {
      const { userId } = req.params;
      const countMaintenanceTicketNeedMaintenance = await assignEngineerTaskService.countMaintenanceTicketNeedMaintenanceByUserId(parseInt(userId));
      res.json({
        status: 'success',
        countMaintenanceTicketNeedMaintenance,
      });
    } catch (error) {
      next(error);
    }
  }

  async countMaintenanceTicketCompletedByUserId(req, res, next) {
    try {
      const { userId } = req.params;
      const countMaintenanceTicketCompleted = await assignEngineerTaskService.countMaintenanceTicketCompletedByUserId(parseInt(userId));
      res.json({
        status: 'success',
        countMaintenanceTicketCompleted,
      });
    } catch (error) {
      next(error);
    }
  }

  async countMaintenanceTicketInProgressByUserId(req, res, next) {
    try {
      const { userId } = req.params;
      const countMaintenanceTicketInProgress = await assignEngineerTaskService.countMaintenanceTicketInProgressByUserId(parseInt(userId));
      res.json({
        status: 'success',
        countMaintenanceTicketInProgress,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AssignEngineerController();