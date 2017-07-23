import compression from 'compression';
import hpp from 'hpp';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import passport from 'passport';
import formidableMiddleware from './uploadHandlers';
import parallel from '../utils/parallel';
import config from '../config';

// VARIABLES
const { UPLOADS_ROOT } = config;

// Default middlewares
const defaultMiddlewares = [
  // Let app use compression
  compression(),

  // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
  cookieParser(),

  // Formidable for file uploads
  formidableMiddleware({
    encoding: 'utf-8',
    uploadDir: UPLOADS_ROOT,
    multiples: true, // req.files to be arrays of files
    keepExtensions: true,
  }),

  // use application/json parser
  bodyParser.json(),
  // Use application/x-www-form-urlencoded parser
  bodyParser.urlencoded({
    extended: true,
    parameterLimit: 100000,
    limit: 1024 * 1024 * 50,
  }),
  // Initialize passport
  passport.initialize(),
  passport.session(),
  // Prevent HTTP Parameter pollution. @note: Make sure body parser goes above the
  // hpp middleware
  hpp(),
  // Content Security Policy
  helmet(),
  // Dynamically or statically enable CORS
  cors(),
];

export default (otherMiddleware) => {
  if (otherMiddleware && otherMiddleware.length > 0) {
    // Run functions parallel or async for more page speed
    return parallel([...defaultMiddlewares, ...otherMiddleware]);
  }

  // Run functions parallel or async for more page speed
  return parallel(defaultMiddlewares);
};
