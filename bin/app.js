const NotFound = require('../app/shared/utils/apiErrors/NotFound');
const ConfigService = require('../app/shared/config.service');
const ResponseService = require('../app/shared/response.service');
const DbService = require('../app/shared/db.service');
const dbService = new DbService({ connectionString: ConfigService.getValue('dbConnectionString') });

/**
 * Route Not Found Error Handler
 */
const routeNotFoundHandler = (req, res, next) => {
  const error = new NotFound('route not found');
  ResponseService.sendErrorResponse(res, error);
};

/**
 * Catches all the errors and sends response
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const mainErrorHandler = (err, req, res, next) => {
  let error = {};

  if (err && err.status && err.message) {
    error = err;
  } else if ((req.app.get('env') === 'production')) {
    error.message = 'Ooops, something went wrong';
  } else {
    error.message = err.stack || err;
  }
  ResponseService.sendErrorResponse(res, error);
};

/**
 * Initialize Models
 */
require('../app/user/user.model');

const App = require('express');
const app = new App();
const bodyParser = require('body-parser');

/**
 * Starts app server
 */
const PORT = ConfigService.getValue('appPort');
const NODE_ENV = ConfigService.getValue('appEnv');
app.listen(process.env.PORT, () => {
  console.log(`Hell yeah on port '${PORT}' under '${NODE_ENV}' environment`);
});


/**
 * Established DB Connection
 */
try {
  dbService.connect();
} catch (err) {
  throw err;
}

/**
 * Sets App Middlewares
 */
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use('/api/v1', require(`${basePath}/routes/`))
  .use(routeNotFoundHandler)
  .use(mainErrorHandler);


module.exports = app;
