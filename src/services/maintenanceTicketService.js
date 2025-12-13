const db = require('../config/db');

class MaintenanceTicketService {
  async getAllMaintenances() {
    const result = await db.query(`
      SELECT maintenance_tickets.*, users.name, users.role
      FROM maintenance_tickets 
      INNER JOIN users ON maintenance_tickets.user_id = users.id
    `);

    return result.rows;
  }

  async getAllMaintenanceTicketsByUserId(userId) {
    const result = await db.query('SELECT maintenance_tickets.*, users.name, users.role FROM maintenance_tickets INNER JOIN users ON maintenance_tickets.user_id = users.id WHERE maintenance_tickets.user_id = $1', [userId]);
    if (!result.rows) {
      throw new Error('No maintenance tickets found');
    }
    return result.rows;
  }

  async createMaintenanceTicket(userId, { title, description, status }) {
    const created_at = new Date().toISOString();
    const updated_at = created_at;

    const result = await db.query('INSERT INTO maintenance_tickets(title, description, status, user_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [title, description, status, userId, created_at, updated_at]);

    return result.rows[0];
  }

  async deleteMaintenanceTicketById(id) {
    const result = await db.query('DELETE FROM maintenance_tickets WHERE id = $1 RETURNING id', [id]);

    if (!result.rows.length) {
      throw new Error('Maintenance ticket not found');
    }
  }

  async getMaintenanceById(id) {
    const result = await db.query('SELECT * FROM maintenance_tickets WHERE id = $1', [id]);
    if (!result.rows.length) {
      throw new Error('Maintenance ticket not found');
    }
    return result.rows[0];
  }

  async updateMaintenanceTicketById(id, { title, description, status }) {
    const updated_at = new Date().toISOString();
    const result = await db.query('UPDATE maintenance_tickets SET title = $1, description = $2, status = $3, updated_at = $4 WHERE id = $5 RETURNING id', [title, description, status, updated_at, id]);

    if (!result.rows.length) {
      throw new Error('Maintenance ticket not found');
    }
  }

  async countMaintenanceTicketNeedMaintenance() {
    const result = await db.query('SELECT COUNT(*) FROM maintenance_tickets WHERE status = $1', ['need_maintenance']);
    return result.rows[0].count;
  }

  async countMaintenanceTicketCompleted() {
    const result = await db.query('SELECT COUNT(*) FROM maintenance_tickets WHERE status = $1', ['completed']);
    return result.rows[0].count;
  }
}

module.exports = new MaintenanceTicketService();