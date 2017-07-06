// Eviromental variables
import dotenv from 'dotenv';

dotenv.config();

const config = {
  // Defaults
  NODE_ENV: process.env.NODE_ENV || 'development',
  PROTOCOL: process.env.ADMIN_PROTOCOL || 'http',
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || 'localhost',

  // Admin
  ADMIN_PROTOCOL: process.env.ADMIN_PROTOCOL || 'http',
  ADMIN_PORT: process.env.ADMIN_PORT || 3030,
  ADMIN_HOST: process.env.ADMIN_HOST || 'localhost',

  // Database
  DB_URL: process.env.DB_URL ||
    'mongodb://starterkit:starterkit@ds161159.mlab.com:61159/starterkit',
  TEST_DB_URL: 'mongodb://localhost/test',
  DB_USERNAME: process.env.DB_USERNAME || 'username',
  DB_PASSWORD: process.env.DB_PASSWORD || 'password',

  // Passport
  JWT_SECRET: process.env.JWT_SECRET || 'secret',

  // Express session
  SESSION_SECRET: process.env.SESSION_SECRET || 'secret',

  // Email
  EMAIL_USERNAME: process.env.EMAIL_USERNAME || '',
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || '',

  // Google Recaptcha
  RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY ||
    '6Ld3NBoUAAAAAIcGj92iDd8O4pOZxB3j4hufgijG',
  RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY ||
    '6Ld3NBoUAAAAAJ0_HGIZbYR1d80zZX3vQOpmx1Yc',

  // Facebook passport
  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID || '',
  FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET || '',
};

export default config;
