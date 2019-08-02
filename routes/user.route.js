const express = require('express');
const appRoute = express.Router({ strict: true });
const controller = require('../app/user/user.controller');

appRoute.post('/', controller.createOne);
appRoute.get('/', controller.getMany);
appRoute.get('/:userId', controller.getOne);

module.exports = appRoute;
