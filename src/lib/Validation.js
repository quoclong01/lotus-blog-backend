const Joi = require('joi');
const moment = require('moment');

const now = Date.now();
const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365.25 * 18));

module.exports = {
  // POST /users
  register: {
    body: {
      email: Joi.string().required(),
      name: Joi.string().required(),
      password: Joi.string().min(5).required()
    }
  },
  // POST /auth
  login: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }
};
