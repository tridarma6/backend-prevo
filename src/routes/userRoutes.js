const express = require('express');
const userController = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const { updateUserSchema, userIdSchema } = require('../validators/userValidator');

const router = express.Router();

// GET /users/me - Get current user profile
router.get('/me', authenticate, userController.getCurrentUser);

// GET /users - Get all users (admin only)
router.get('/', authenticate, authorizeRoles('admin'), userController.getAllUsers);

// GET /users/:id - Get specific user (admin only)
router.get('/:id', validate(userIdSchema, 'params'), authenticate, authorizeRoles('admin'), userController.getUserById);

router.patch('/:id', validate(userIdSchema, 'params'), validate(updateUserSchema, 'body'), authenticate, authorizeRoles('admin'), userController.updateUserById);
router.delete('/:id', validate(userIdSchema, 'params'), authenticate, authorizeRoles('admin'), userController.deleteUserById);
router.get('/engineer/count', authenticate, authorizeRoles('admin'), userController.countUserEngineer);


module.exports = router;