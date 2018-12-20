const HttpStatus = require('http-status');

/**
 * Class representing an API error.
 * @extends Error
 */
class APIError extends Error {
  /**
   * Creates an API error.
   * @param {number} status - HTTP status code of error.
   * @param {string} message - Custom error message.
   */
  constructor(status = HttpStatus.INTERNAL_SERVER_ERROR, message) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.message = message;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    Error.captureStackTrace(this, this.constructor.name);
  }
}

module.exports = APIError;
