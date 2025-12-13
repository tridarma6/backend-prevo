const db = require('../config/db');

class AssignMaintenanceTaskService {
  async createAssignUserToTicket(userId, maintenanceTicketId) {
    const created_at = new Date().toISOString();
    const updated_at = created_at;

    const result = await db.query('INSERT INTO assign_maintenance_tasks(user_id, maintenance_ticket_id, created_at, updated_at) VALUES ($1, $2, $3, $4) ON CONFLICT (user_id, maintenance_ticket_id) DO NOTHING RETURNING id', [userId, maintenanceTicketId, created_at, updated_at]);

    return result.rows[0];
  }

  async getAssignedUsers(maintenanceTicketId) {
    const result = await db.query(
      `SELECT users.id, users.name, users.role 
     FROM assign_maintenance_tasks 
     INNER JOIN users 
       ON assign_maintenance_tasks.user_id = users.id 
     WHERE assign_maintenance_tasks.maintenance_ticket_id = $1`,
      [maintenanceTicketId]
    );

    return result.rows;
  }

  async getAllTicketsWithUsers(maintenanceTicketId) {
    const ticketResponse = await db.query('SELECT id, title, description, status FROM maintenance_tickets WHERE id = $1', [maintenanceTicketId]);

    const tickets = ticketResponse.rows;

    const userResponse = await db.query('SELECT assign_maintenance_tasks.id as assignment_maintenance_task_id, assign_maintenance_tasks.maintenance_ticket_id, users.id, users.name, users.role, users.email, users.phone_number FROM assign_maintenance_tasks LEFT JOIN users ON users.id = assign_maintenance_tasks.user_id WHERE assign_maintenance_tasks.maintenance_ticket_id = $1', [maintenanceTicketId]);

    const userAssignments = userResponse.rows;

    const ticketMap = {};

    tickets.forEach((ticket) => {
      ticketMap[ticket.id] = { ...ticket, assign_users: [] };
    });

    userAssignments.forEach((userAssignment) => {
      if (ticketMap[userAssignment.maintenance_ticket_id]) {
        ticketMap[userAssignment.maintenance_ticket_id].assign_users.push({
          id: userAssignment.id,
          name: userAssignment.name,
          role: userAssignment.role,
          email: userAssignment.email,
          phone_number: userAssignment.phone_number,
          id_assignment_maintenance_task: userAssignment.assignment_maintenance_task_id
        });
      }
    });

    return Object.values(ticketMap);
  }

  async deleteAssignmentTicketById(id) {
    const result = await db.query('DELETE FROM assign_maintenance_tasks WHERE id = $1 RETURNING id', [id]);

    if (!result.rows.length) {
      throw new Error('Assignment not found');
    }

    return result.rows[0];
  }
}

module.exports = new AssignMaintenanceTaskService();