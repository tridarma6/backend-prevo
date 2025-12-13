const express = require('express');
const router = express.Router();

const assignmentMaintenanceTicketController = require('../controllers/assignMaintenanceTaskController');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const { assignMaintenanceTaskSchema } = require('../validators/assignMaintenanceTaskValidator');

router.get('/:maintenanceTicketId', authenticate, authorizeRoles('admin'), assignmentMaintenanceTicketController.getAllTicketsAssignUsers);
router.post('/assign', authenticate, authorizeRoles('admin'), validate(assignMaintenanceTaskSchema, 'body'), assignmentMaintenanceTicketController.createAssignUserToTicket);
router.get('/assign/:ticketId', authenticate, authorizeRoles('admin'), assignmentMaintenanceTicketController.getAssignUsers);
router.delete('/assign/:id', authenticate, authorizeRoles('admin'), assignmentMaintenanceTicketController.deleteAssignmentTicketById);

module.exports = router;