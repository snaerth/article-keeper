// Eviromental variables
import dotenv from 'dotenv';

dotenv.config();

const config = {
  // Uploads root folder
  UPLOADS_ROOT: process.env.UPLOADS_ROOT || './uploads/',

  // Defaults
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Protocol
  API_PROTOCOL: process.env.API_PROTOCOL || 'http',

  // Port
  API_PORT: process.env.API_PORT || 3030,

  // Host
  API_HOST: process.env.API_HOST || 'localhost',

  // Database url
  DB_URL: process.env.DB_URL || 'mongodb://localhost/application',

  // Database test url
  TEST_DB_URL: 'mongodb://localhost/test',

  // Database username
  DB_USERNAME: process.env.DB_USERNAME || 'username',

  // Database password
  DB_PASSWORD: process.env.DB_PASSWORD || 'password',

  // Passport jwt secret
  JWT_SECRET: process.env.JWT_SECRET || 'secret',

  // Express session
  SESSION_SECRET: process.env.SESSION_SECRET || 'secret',

  // Email username
  EMAIL_USERNAME: process.env.EMAIL_USERNAME || '',

  // Email password
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || '',

  // Facebook client id
  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID || '',

  // Facebook client secret
  FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET || '',
};

export default config;
