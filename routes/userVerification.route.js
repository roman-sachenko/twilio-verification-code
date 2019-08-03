const express = require('express');
const appRoute = express.Router({ strict: true, mergeParams: true });
const controller = require('../app/userVerification/userVerification.controller');

appRoute.get('/', controller.sendCode);
appRoute.put('/', controller.verifyCode);

module.exports = appRoute;
