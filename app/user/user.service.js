const UserRepository = require('./user.repository');

module.exports = class UserService {
  constructor(repository = new UserRepository()) {
    this._repository = repository;
  }

  createOne(data) {
    return this._repository.createOne(data);
  }

  findById(userId) {
    return this._repository.findById(userId);
  }

  findMany() {
    return this._repository.findMany();
  }

  setVerificationCode(userId, code) {
    return this._repository.updateById(userId, { verificationCode: code, isVerified: false });
  }
};
