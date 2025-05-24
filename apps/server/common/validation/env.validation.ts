import * as Joi from 'joi';

export const EnvValidationSchema = Joi.object({
  PORT_FRONTEND: Joi.number()
    .port()
    .default('3000')
    .description('The port the frontend server should listen on'),

  PORT_BACKEND: Joi.number()
    .port()
    .default('3001')
    .description('The port the backend server should listen on'),

  FRONTEND_URL: Joi.string()
    .uri()
    .default('http://localhost:3000')
    .description('The URL of the frontend server'),

  BACKEND_URL: Joi.string()
    .default('http://localhost:3001')
    .uri()
    .description('The URL of the backend server'),

  DEFAULT_LANGUAGE: Joi.string()
    .valid('en_US', 'de_DE')
    .default('en_US')
    .description('The default language of the application'),

  AVATAR_TYPE: Joi.string()
    .valid('GRAVATAR')
    .default('GRAVATAR')
    .description('The type of avatar service to use'),

  MAX_COMPANIONS_PER_GUEST: Joi.number()
    .min(1)
    .default(1)
    .description('The maximum number of companions per guest'),

  DATABASE_URL: Joi.string()
    .default('file:./dev.db')
    .description(
      'The URL of the database. Supports SQLite, MySQL, MariaDB, Postgres, and MSSQL',
    ),

  JWT_SECRET: Joi.string()
    .required()
    .disallow('secret')
    .description(
      'The secret used to sign the JWT tokens. The JWT tokens are used to authenticate the users. Should be a very long and random string.',
    ),

  JWT_EXPIRATION: Joi.string()
    .default('180d')
    .description('The expiration time of the JWT tokens'),

  EMAIL_HOST: Joi.string()
    .optional()
    .hostname()
    .description('The host of the SMTP server used to send emails'),

  EMAIL_PORT: Joi.number()
    .optional()
    .default('587')
    .port()
    .description('The port of the SMTP server used to send emails'),

  EMAIL_HOST_USER: Joi.string()
    .optional()
    .description('The username of the SMTP server used to send emails'),

  EMAIL_HOST_PASSWORD: Joi.string()
    .optional()
    .description('The password of the SMTP server used to send emails'),

  GITHUB_CLIENT_ID: Joi.string().required(),
  GITHUB_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  DISCORD_CLIENT_ID: Joi.string().required(),
  DISCORD_CLIENT_SECRET: Joi.string().required(),

  AUTH_CALLBACK_BASE: Joi.string()
    .required()
    .description('The base url for the auth callback'),
  AUTH_TOKEN_EXPIRATION: Joi.string()
    .default('15m')
    .description('The expiration time of the jwt auth tokens'),
});
