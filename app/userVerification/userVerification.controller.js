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

  verifyCode(req, res, next) {
    try {
      userVerificationService.verifyCode(req.params.userId, req.body.verifyCode);
    } catch (err) {
      return next(err);
    }
  },
};
