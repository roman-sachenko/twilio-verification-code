const UserVerificationService = require('./userVerification.service');
const ResponseService = require('../shared/response.service');

const userVerificationService = new UserVerificationService();


module.exports = {
  async sendCode(req, res, next) {
    try {
      const result = await userVerificationService.sendCode(req.params.userId);

      return ResponseService.sendSuccessResponse(res, result);
    } catch (err) {
      return next(err);
    }
  },

  async verifyCode(req, res, next) {
    try {
      const result = await userVerificationService.verifyCode(req.params.userId, req.body.verificationCode);

      return ResponseService.sendSuccessResponse(res, result);
    } catch (err) {
      return next(err);
    }
  },
};
