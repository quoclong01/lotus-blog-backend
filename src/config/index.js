const Joi = require('joi');
const jwtConfig = require('./jwt');
const dbConfig = require('./db');
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().allow(['development', 'production', 'test', 'staging']).default('development'),
  PORT: Joi.number().default(3001),
  DB_NAME: Joi.string().required().description('DB_NAME is required.'),
  DB_USER: Joi.string().required().description('DB_USER is required.'),
  DB_PASSWORD: Joi.string().required().description('DB_PASSWORD is required.'),
  DB_HOST: Joi.string().required().description('DB_HOST is required.'),
  DB_NAME: Joi.string().required().description('DB_NAME is required.'),
  DB_DIALECT: Joi.string().required().description('DB_DIALECT is required.'),
  DB_PORT: Joi.string().required().description('DB_PORT is required.'),
  JWT_ISSUER: Joi.string().required().description('JWT_ISSUER is required.'),
  JWT_AUDIENCE: Joi.string().required().description('JWT_AUDIENCE is required.'),
  JWT_SECRET: Joi.string().required().description('JWT_SECRET is required.')
}).unknown().required();

const {
  error,
  value: envVars
} = Joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

jwtConfig.issuer = envVars.JWT_ISSUER;
jwtConfig.audience = envVars.JWT_AUDIENCE;
jwtConfig.secret = envVars.JWT_SECRET;

dbConfig.db_name = envVars.DB_NAME;
dbConfig.db_user = envVars.DB_USER;
dbConfig.db_password = envVars.DB_PASSWORD;
dbConfig.db_host = envVars.DB_HOST;
dbConfig.db_dialect = envVars.DB_DIALECT;
dbConfig.db_port = envVars.DB_PORT;

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  db: dbConfig,
  jwt: jwtConfig
};
