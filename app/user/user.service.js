const UserRepository = require('./user.repository');

module.exports = class UserService {
  constructor(repository = new UserRepository()) {
    this._repository = repository;
  }

  async createOne(data) {
    if (!data) {
      throw new Error('ERR_USER_DATA_INVALID');
    }

    return this._repository.createOne(data);
  }

  findByPhoneNumber(phoneNumber) {
    return this._repository.findOne({ phoneNumber });
  }

  findById(userId) {
    if (!userId) {
      throw new Error('ERR_USER_ID_NOT_PROVIDED');
    }
    return this._repository.findById(userId);
  }

  updateById(userId, updateData) {
    if (!userId) {
      throw new Error('ERR_USER_ID_NOT_PROVIDED');
    }
    return this._repository.updateById(userId, updateData);
  }

  findMany() {
    return this._repository.findMany();
  }

  async setVerificationCode(userId, code) {
    if (!userId) {
      throw new Error('ERR_USER_ID_NOT_PROVIDED');
    }

    if (!code) {
      throw new Error('ERR_VERIFICATION_CODE_NOT_PROVIDED');
    }

    const updateResult = await this._repository.updateById(userId, { verificationCode: code, isVerified: false });

    if (updateResult) {
      return true;
    }

    throw new Error('ERR_FAILED_SET_CODE');
  }

  async setVerifiedCodeInfo(userId) {

    if (!userId) {
      throw new Error('ERR_USER_ID_NOT_PROVIDED');
    }

    await this._repository.updateById(userId, { verificationCode: null, isVerified: true });
    return true;
  }
};
