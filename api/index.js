/* eslint no-console: 0 */
import http from 'http';
import express from 'express';
import RateLimit from 'express-rate-limit';
import session from 'express-session';
import routes from './routes';
import errorHandlers from './middleware/errorHandlers';
import middleware from './middleware';
import config from './config';
import db from './database/db';
import { createDirectorys } from './services/fileService';

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// VARIABLES
const { API_PORT, DB_URL, SESSION_SECRET } = config;

// Create default directorys if not exist
createDirectorys();

// Intialize and setup server
const app = express();

// Create HTTP Server
const server = new http.Server(app);

// Basic IP rate-limiting middleware for Express. Use to limit repeated requests
// to public APIs and/or endpoints such as password reset.
const limiter = new RateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 30, // limit each IP to 10 requests per windowMs
  delayMs: 0, // disabled
});

// Express session options
const sessionOptions = {
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 86400,
  }, // 24 Hours
};

// Production
if (process.env.NODE_ENV === 'production') {
  // Trust proxy
  app.set('trust proxy', 1);
  // Serve secure cookies
  sessionOptions.cookie.secure = true;
}

db(DB_URL, () => {
  // Hide all software information
  app.disable('x-powered-by');

  // Apply middleware to app
  app.use(middleware([limiter, session(sessionOptions)]));

  // Admin routes
  routes(app);

  // Error Handler middlewares.
  app.use(...errorHandlers);
});

// Create an http listener for our express app.
const listener = server.listen(API_PORT, (error) => {
  if (error) {
    console.error(error);
  }
  console.info('Api server listening on port %s', API_PORT);
});

// We export the listener as it will be handy for our development hot reloader,
// or for exposing a general extension layer for application customisations.
export default listener;
