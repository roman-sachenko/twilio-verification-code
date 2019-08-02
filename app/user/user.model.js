
const DbService = require('../shared/db.service');
const schema = require('./user.schema');

module.exports = DbService.createModel('User.Profile', schema);

