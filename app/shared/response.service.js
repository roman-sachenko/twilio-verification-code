/**
 * Service to close response data formatting
 * Uses express res.send method
 */

module.exports = class ResponseService {

  static sendSuccessResponse(response, data) {
    response.send(data);
  }

  static sendErrorResponse(response, err) {
    const errStatus = err.status || 500;
    response.status(errStatus).send({ error: err.message });
  }
};
