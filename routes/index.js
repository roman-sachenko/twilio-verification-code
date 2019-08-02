const express = require('express');
const appRoute = express.Router({ strict: true, mergeParams: true });

/**
 * API V1 Routes
 */
appRoute.use('/users', require('./user.route'));
appRoute.use('/users/:userId/verification', require('./userVerification.route'));

module.exports = appRoute;
