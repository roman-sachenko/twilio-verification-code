const DbModelService = require('../shared/dbModel.service');

module.exports = class UserRepository extends DbModelService {
  constructor() {
    super('User.Profile');
  }
};
