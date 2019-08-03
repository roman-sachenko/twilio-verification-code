
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
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  async sendCode(userId) {

    if (!userId) {
      throw new Error('ERR_USER_ID_NOT_PROVIDED');
    }

    const userFound = await this._userService.findById(userId);

    if (!userFound) {
      throw Error('ERR_USER_INVALID');

    }

    const code = this._generateCode();

    
    await this._userService.setVerificationCode(userId, code); // wait for update first
    await this._smsService.send({
      body: code,
      to: userFound.phoneNumber,
    });

    return true;
  }

  async verifyCode(userId, verificationCode) {
    if (!userId) {
      throw new Error('ERR_USER_ID_NOT_PROVIDED');
    }

    if (!verificationCode) {
      throw new Error('ERR_VERIFICATION_CODE_NOT_PROVIDED');
    }

    const userFound = await this._userService.findById(userId);

    if (!userFound) {
      throw new Error('ERR_USER_INVALID');
    }

    if (verificationCode === userFound.verificationCode) {
      await this._userService.setVerifiedCodeInfo(userId);
      return true;
    }

    return false;
  }
};
