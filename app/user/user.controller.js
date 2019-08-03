const UserService = require('./user.service');
const ResponseService = require('../shared/response.service');
const BadRequest = require('../shared/utils/apiErrors/BadRequest');
const AlreadyExist = require('../shared/utils/apiErrors/AlreadyExist');
const userValidation = require('./user.validation');
const userService = new UserService();

module.exports = {
  async createOne({ body }, res, next) {
    try {
      const userRequestValidation = userValidation.createOne({ body });

      if (userRequestValidation.error) {
        throw new BadRequest(userRequestValidation.error);
      }

      const userFound = await userService.findByPhoneNumber(body.phoneNumber);

      if (userFound) {
        throw new AlreadyExist('ERR_PHONE_NUMBER_EXIST');
      }

      const userData = body;
      const newUser = await userService.createOne(userData);

      return ResponseService.sendSuccessResponse(res, newUser);
    } catch (err) {
      return next(err);
    }
  },

  async getOne({ params }, res, next) {
    try {

      const userRequestValidation = userValidation.getOne({ params });

      if (userRequestValidation.error) {
        throw new BadRequest(userRequestValidation.error);
      }

      const userFound = await userService.findById(params.userId);

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
