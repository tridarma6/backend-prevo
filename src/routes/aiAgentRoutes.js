const express = require('express');
const aiAgentController = require('../controllers/aiAgentController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticate, aiAgentController.handleChatRequest);
router.get('/:userId', authenticate, aiAgentController.getAllChatLogsByUserId);
router.delete('/logs/:userId', authenticate, aiAgentController.deleteAllChatLogsByUserId);
router.delete('/log/:id', authenticate, aiAgentController.deleteChatLogById);

module.exports = router;