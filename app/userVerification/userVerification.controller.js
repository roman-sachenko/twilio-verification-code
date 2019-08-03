const UserVerificationService = require('./userVerification.service');
const ResponseService = require('../shared/response.service');
const userVerificationValidation = require('./userVerification.validation');
const BadRequest = require('../shared/utils/apiErrors/BadRequest');

const userVerificationService = new UserVerificationService();


module.exports = {
  async sendCode({ params }, res, next) {
    try {

      const requestDataValidation = userVerificationValidation.sendCode({ params });

      if (requestDataValidation.error) {
        throw new BadRequest(requestDataValidation.error);
      }

      const result = await userVerificationService.sendCode(params.userId);

      return ResponseService.sendSuccessResponse(res, result);
    } catch (err) {
      return next(err);
    }
  },

  async verifyCode({ params, body }, res, next) {
    try {

      const requestDataValidation = userVerificationValidation.verifyCode({ params, body });
      
      if (requestDataValidation.error) {
        throw new BadRequest(requestDataValidation.error);
      }

      const result = await userVerificationService.verifyCode(params.userId, body.verificationCode);

      return ResponseService.sendSuccessResponse(res, result);
    } catch (err) {
      return next(err);
    }
  },
};
