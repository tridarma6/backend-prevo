const axios = require('axios');
const db = require('../config/db');

// for testing akun
// production
// const N8N_WEBHOOK_URL = 'https://puturifkidy.app.n8n.cloud/webhook/587f195c-b8fb-4d4f-9018-88fcd02a627f';
// local
// const N8N_WEBHOOK_URL = 'https://puturifkidy.app.n8n.cloud/webhook-test/587f195c-b8fb-4d4f-9018-88fcd02a627f';

// for penilaian asah
// production
// const N8N_WEBHOOK_URL = 'https://dirkayuda.app.n8n.cloud/webhook/587f195c-b8fb-4d4f-9018-88fcd02a627f';
// local
const N8N_WEBHOOK_URL = 'https://dirkayuda.app.n8n.cloud/webhook-test/587f195c-b8fb-4d4f-9018-88fcd02a627f';
class AIAgentService {
  async sendChatToAgent(message, userId) {
    const created_at = new Date().toISOString();
    const updated_at = created_at;
    if (!N8N_WEBHOOK_URL.includes('webhook')) {
      console.warn('N8N_WEBHOOK_URL has not been seet, please set yaaa');
    }

    try {
      const userResult = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
      const userRole = userResult.rows[0].role || 'user';

      const n8nResponse = await axios.post(N8N_WEBHOOK_URL, {
        message,
        userId,
        userRole
      });

      await db.query('INSERT INTO chat_logs (sender_type, message, user_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)', ['user', message, userId, created_at, updated_at]);

      await db.query('INSERT INTO chat_logs (sender_type, message, user_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)', ['agent', n8nResponse.data.message, userId, created_at, updated_at]);

      return n8nResponse.data;
    } catch (error) {
      console.log(error);
      console.error('Error while communicating with agent :', error.response);
      throw new Error('Failed to send message to agent');
    }
  }

  async getAllChatLogsByUserId(userId) {
    const result = await db.query('SELECT * FROM chat_logs WHERE user_id = $1', [userId]);
    if (!result.rows) {
      throw new Error('No chat logs found');
    }
    return result.rows;
  }

  async deleteChatLogsByUserId(userId) {
    const result = await db.query('DELETE FROM chat_logs WHERE user_id = $1 RETURNING id', [userId]);
    if (!result.rows.length) {
      throw new Error('No chat logs found');
    }
  }

  async deleteChatLogById(id) {
    const result = await db.query('DELETE FROM chat_logs WHERE id = $1 RETURNING id', [id]);
    if (!result.rows.length) {
      throw new Error('Chat log not found');
    }
  }
}

module.exports = new AIAgentService();