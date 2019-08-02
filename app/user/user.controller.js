const UserService = require('./user.service');
const ResponseService = require('../shared/response.service');
const userService = new UserService();

module.exports = {
  async createOne(req, res, next) {
    try {
      const userData = req.body;
      const newUser = await userService.createOne(userData);
      
      return ResponseService.sendSuccessResponse(res, newUser);
    } catch (err) {
      return next(err);
    }
  },

  async getOne(req, res, next) {
    try {
      const userFound = await userService.findById(req.params.userId);
      
      return ResponseService.sendSuccessResponse(res, userFound);
    } catch (err) {
      return next(err);
    }
  },

  async getMany(req, res, next) {
    try {
      const usersFound = await userService.findMany();
      
      return ResponseService.sendSuccessResponse(res, usersFound);
    } catch (err) {
      return next(err);
    }
  },
};
