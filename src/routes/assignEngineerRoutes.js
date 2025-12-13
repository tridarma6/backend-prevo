const express = require('express');
const router = express.Router();

const assignEngineerController = require('../controllers/assignEngineerController');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { statusMaintenanceSchema } = require('../validators/maintenanceTicketValidator');
const { validate } = require('../middlewares/validationMiddleware');

router.get('/:userId', authenticate, authorizeRoles('user'), assignEngineerController.getAssignEngineer);
router.patch('/:id', authenticate, authorizeRoles('user'),  validate(statusMaintenanceSchema, 'body'), assignEngineerController.updateAssignedEngineerTicketMaintenance);
router.get('/status/:id', authenticate, authorizeRoles('user'), assignEngineerController.getAssignedEngineerTicketById);
router.get('/need-maintenance/count/:userId', authenticate, authorizeRoles('user'), assignEngineerController.countMaintenanceTicketNeedMaintenanceByUserId);
router.get('/completed/count/:userId', authenticate, authorizeRoles('user'), assignEngineerController.countMaintenanceTicketCompletedByUserId);
router.get('/in-progress/count/:userId', authenticate, authorizeRoles('user'), assignEngineerController.countMaintenanceTicketInProgressByUserId);
module.exports = router;