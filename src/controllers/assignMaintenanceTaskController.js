const assignmentMaintenanceTicket = require('../services/assignMaintenanceTaskService');

class AssignmentMaintenanceTicketController {
  async createAssignUserToTicket(req, res, next) {
    try {
      const { userId, maintenanceTicketId } = req.body;
      const result = await assignmentMaintenanceTicket.createAssignUserToTicket(userId, maintenanceTicketId);

      res.json({
        status: 'success',
        message: 'User assigned to maintenance ticket successfully',
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAssignUsers(req, res, next) {
    try {
      const { ticketId } = req.params;
      const assignMaintenanceUsers = await assignmentMaintenanceTicket.getAssignedUsers(ticketId);
      res.json({
        status: 'success',
        assignMaintenanceUsers,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllTicketsAssignUsers(req, res, next) {
    try {
      const { maintenanceTicketId } = req.params;
      const allTicketsAssignUsers = await assignmentMaintenanceTicket.getAllTicketsWithUsers(maintenanceTicketId);
      res.json({
        status: 'success',
        allTicketsAssignUsers
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteAssignmentTicketById(req, res, next) {
    const id = parseInt(req.params.id);
    try {
      await assignmentMaintenanceTicket.deleteAssignmentTicketById(id);
      res.json({
        status: 'success',
        message: 'Assignment deleted successfully',
      });
    } catch (error) {
      if (error.message === 'Assignment not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }
}

module.exports = new AssignmentMaintenanceTicketController();