const aiAgentService = require('../services/aiAgentService');
class AIAgentController {
  async handleChatRequest(req, res) {
    const { message, userId } = req.body;

    if (!message) {
      return res.status(400).json({
        error: 'Message is required',
      });
    }

    try {
      const agentResponse = await aiAgentService.sendChatToAgent(
        message,
        userId,
      );
      res.json({
        status: 'success',
        agentResponse,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message || 'Internal server error',
      });
    }
  }

  async getAllChatLogsByUserId(req, res, next) {
    try {
      const userId = parseInt(req.params.userId);
      const chatLogs = await aiAgentService.getAllChatLogsByUserId(userId);
      res.json({
        chatLogs,
        status: 'success',
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteAllChatLogsByUserId(req, res, next) {
    try {
      const userId = parseInt(req.params.userId);
      await aiAgentService.deleteChatLogsByUserId(userId);
      res.json({
        status: 'success',
        message: 'All chat logs deleted successfully',
      });
    } catch (error) {
      if (error.message === 'No chat logs found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async deleteChatLogById(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      await aiAgentService.deleteChatLogById(id);
      res.json({
        status: 'success',
        message: 'Chat log deleted successfully',
      });
    } catch (error) {
      if (error.message === 'Chat log not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }
}

module.exports = new AIAgentController();
