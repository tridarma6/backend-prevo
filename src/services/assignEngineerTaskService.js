const db = require('../config/db');

class AssignEngineerTaskService {
  async getAssignedEngineers(userId) {
    const result = await db.query(
      'select maintenance_tickets.id, maintenance_tickets.title, maintenance_tickets.description, maintenance_tickets.status, users.name, users.email, users.role, users.phone_number from assign_maintenance_tasks inner join maintenance_tickets on assign_maintenance_tasks.maintenance_ticket_id = maintenance_tickets.id inner join users on assign_maintenance_tasks.user_id = users.id where assign_maintenance_tasks.user_id = $1;',
      [userId]
    );

    return result.rows;
  }

  async updateAssignedEngineerTicketMaintenance(id, { status }) {
    const updated_at = new Date().toISOString();
    const result = await db.query(
      'UPDATE maintenance_tickets SET status = $1, updated_at = $2 WHERE id = $3 RETURNING id',
      [status, updated_at, id]
    );

    if (!result.rows.length) {
      throw new Error('Maintenance ticket not found');
    }

    return result.rows[0];
  }

  async getAssignedEngineerTicketStatusById(id) {
    const result = await db.query(
      'SELECT status FROM maintenance_tickets WHERE id = $1',
      [id]
    );
    if (!result.rows.length) {
      throw new Error('Maintenance ticket not found');
    }
    return result.rows[0];
  }

  async countMaintenanceTicketNeedMaintenanceByUserId(userId) {
    const result = await db.query('SELECT COUNT(*) AS total_need_maintenance FROM assign_maintenance_tasks amt JOIN maintenance_tickets mt ON amt.maintenance_ticket_id = mt.id WHERE mt.status = $1 AND amt.user_id = $2;',
      ['need_maintenance', userId]
    );
    return result.rows[0];
  }

  async countMaintenanceTicketCompletedByUserId(userId) {
    const result = await db.query('SELECT COUNT(*) AS total_completed FROM assign_maintenance_tasks amt JOIN maintenance_tickets mt ON amt.maintenance_ticket_id = mt.id WHERE mt.status = $1 AND amt.user_id = $2;',
      ['completed', userId]
    );
    return result.rows[0];
  }

  async countMaintenanceTicketInProgressByUserId(userId) {
    const result = await db.query('SELECT COUNT(*) AS total_in_progress FROM assign_maintenance_tasks amt JOIN maintenance_tickets mt ON amt.maintenance_ticket_id = mt.id WHERE mt.status = $1 AND amt.user_id = $2;',
      ['in_progress', userId]
    );
    return result.rows[0];
  }
}

module.exports = new AssignEngineerTaskService();
