import dotenv from 'dotenv';
import { get } from 'env-var';
import path from 'path';

// Allow environment variables from a file for development.
dotenv.config({ path: path.join(__dirname, '../..', '.env') });

// Helper constant to check whether the server is in production mode or not.
const isProd = process.env.NODE_ENV === 'production';

/**
 * All configuration values of this application from the environment variables.
 * Intentionally spaced so it is easier to read and find out what is related with what.
 */
const config = {
  // Cookie.
  SESSION_SECRET: get('SESSION_SECRET').default('secretvalue').asString(),

  DB_DATABASE: get('DB_DATABASE').required().asString(),
  DB_HOST: get('DB_HOST').required().asString(),
  DB_PASSWORD: get('DB_PASSWORD').required().asString(),
  DB_PORT: get('DB_PORT').required().asPortNumber(),
  DB_USERNAME: get('DB_USERNAME').required().asString(),

  // Emails.
  EMAIL_FROM: get('EMAIL_FROM').required(isProd).asString(),
  EMAIL_HOST: get('EMAIL_HOST').required(isProd).asString(),
  EMAIL_USERNAME: get('EMAIL_USERNAME').required(isProd).asString(),
  EMAIL_PASSWORD: get('EMAIL_PASSWORD').required(isProd).asString(),
  EMAIL_PORT: get('EMAIL_PORT').default(465).asPortNumber(),

  // JWT tokens for second session.
  JWT_AUDIENCE: get('JWT_AUDIENCE').default('users').asString(),
  JWT_COOKIE_NAME: get('JWT_COOKIE_NAME').default('jwt').asString(),
  JWT_ISSUER: get('JWT_ISSUER').default('api').asString(),
  JWT_PRIVATE_KEY: get('JWT_PRIVATE_KEY')
    .required()
    .convertFromBase64()
    .asString(),
  JWT_PUBLIC_KEY: get('JWT_PUBLIC_KEY')
    .required()
    .convertFromBase64()
    .asString(),

  // Mailtrap: emails for development.
  MAILTRAP_HOST: get('MAILTRAP_HOST').required(!isProd).asString(),
  MAILTRAP_USERNAME: get('MAILTRAP_USERNAME').required(!isProd).asString(),
  MAILTRAP_PASSWORD: get('MAILTRAP_PASSWORD').required(!isProd).asString(),

  // Environment.
  NODE_ENV: get('NODE_ENV')
    .default('development')
    .asEnum(['development', 'production', 'test']),

  // Redis.
  REDIS_HOST: get('REDIS_HOST').default('localhost').asString(),
  REDIS_PASSWORD: get('REDIS_PASSWORD').default('').asString(),
  REDIS_PORT: get('REDIS_PORT').default(6379).asPortNumber(),

  // Ports.
  PORT: get('PORT').default(4000).asPortNumber(),

  // Session cookie name.
  SESSION_NAME: get('SESSION_NAME').default('connect.sid').asString(),

  // Issuer of the TOTP.
  TOTP_ISSUER: get('TOTP_ISSUER').default('Dev').asString(),

  TELEGRAM_BOT_TOKEN: get('TELEGRAM_BOT_TOKEN').required().asString(),
};

export default Object.freeze(config);
