const userService = require('../services/userService');

class UserController {
  async getCurrentUser(req, res, next) {
    try {
      const user = await userService.getCurrentUser(req.user.id);
      res.json({
        user,
        status: 'success',
      });
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.json({
        users,
        status: 'success',
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(parseInt(id));
      res.json({
        user,
        status: 'success',
      });
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async updateUserById(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const { name, email, phone_number, role, password } = req.body;
      const user = await userService.updateUserId(id, {
        name,
        email,
        phone_number,
        role,
        password
      });
      res.json({
        user,
        status: 'success',
        message: 'User updated successfully',
      });
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async deleteUserById(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      await userService.deleteUserById(id);
      res.json({
        status: 'success',
        message: 'User deleted successfully',
      });
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: error.message });
      } else if (error.message == 'Cannot delete admin user') {
        return res.status(400).json({ error: error.message });
      }
      next(error);
    }
  }

  async countUserEngineer(req, res, next) {
    try {
      const count = await userService.countUserEngineer();
      res.json({
        status: 'success',
        count,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
