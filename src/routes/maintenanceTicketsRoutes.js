const express = require('express');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const maintenanceTicketController = require('../controllers/maintenanceTicketController');
const { validate } = require('../middlewares/validationMiddleware');
const { maintenanceTicketSchema, maintenanceTicketUpdateSchame } = require('../validators/maintenanceTicketValidator');

const router = express.Router();

router.get('/', authenticate, authorizeRoles('admin'), maintenanceTicketController.getAllMaintenance);
router.get('/:userId', authenticate, authorizeRoles('user'), maintenanceTicketController.getAllMaintenanceTicketsByUserId);
router.get('/single/:id', authenticate, authorizeRoles('admin'), maintenanceTicketController.getMaintenanceTicketById);
router.post('/:userId', authenticate, authorizeRoles('admin'), validate(maintenanceTicketSchema, 'body'), maintenanceTicketController.createMaintenanceTicket);
router.delete('/:id', authenticate, authorizeRoles('admin'), maintenanceTicketController.deleteMaintenanceTicketById);
router.patch('/:id', authenticate, authorizeRoles('admin'), validate(maintenanceTicketUpdateSchame, 'body'), maintenanceTicketController.updateMaintenanceTicketById);
router.get('/need-maintenance/count', authenticate, authorizeRoles('admin', 'user'), maintenanceTicketController.countMaintenanceTicketNeedMaintenance);
router.get('/completed/count', authenticate, authorizeRoles('admin', 'user'), maintenanceTicketController.countMaintenanceTicketCompleted);


module.exports = router;