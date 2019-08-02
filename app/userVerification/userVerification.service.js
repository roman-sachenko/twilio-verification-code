
const SmsService = require('../shared/sms.service');
const UserService = require('../user/user.service');

module.exports = class UserVerificationService {
  constructor(
    smsService = new SmsService(),
    userService = new UserService(),
  ) {
    this._smsService = smsService;
    this._userService = userService;
  }

  /**
   * Returns 4 digit code
   * Simple realization using Math.rand (not secured enough)
   */
  _generateCode() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  async sendCode(userId) {
    const userFound = await this._userService.findById(userId);

    if (!userFound) {
      throw Error('invalid user');

    }

    const code = this._generateCode();

    await this._smsService.send({
      body: code,
      to: userFound.phoneNumber,
    });

    await this._userService.setVerificationCode(userId, code);

    return true;
  }

  async verifyCode(userId, verificationCode) {
    const userFound = await this._userService.findById(userId);

    if (!userFound) {
      return false;
    }
    
    if (verificationCode === userFound.verificationCode) {
      await this._userService.updateById(userId, { verificationCode: null, isVerified: true });
      return true;
    }

    return false;
  }
};
