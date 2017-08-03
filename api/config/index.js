// Eviromental variables
import dotenv from 'dotenv';

dotenv.config();

const config = {
  // Application name
  APPLICATION_NAME: process.env.APPLICATION_NAME || 'Application name',

  // Uploads root folder
  UPLOADS_ROOT: process.env.UPLOADS_ROOT || './uploads/',

  // Defaults
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Api Protocol
  API_PROTOCOL: process.env.API_PROTOCOL || 'http',

  // Api Port
  API_PORT: process.env.API_PORT || 3030,

  // Api Host
  API_HOST: process.env.API_HOST || 'localhost',

  // Protocol
  PROTOCOL: process.env.PROTOCOL || 'http',

  // Port
  PORT: process.env.PORT || 3000,

  // Host
  HOST: process.env.HOST || 'localhost',

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

  // Twitter consumer key
  TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY || '',

  // Twitter consumer secret
  TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET || '',

  // Google client id
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',

  // Google client secret
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
};

export default config;
