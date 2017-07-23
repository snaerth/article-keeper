import compression from 'compression';
import cookieParser from 'cookie-parser';
import security from './security';
import parallel from '../utils/parallel';

// Default middlewares
const defaultMiddlewares = [
  // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
  cookieParser(),

  // Security middlewares.
  ...security,

  // Gzip compress the responses.
  compression(),
];

export default (otherMiddleware) => {
  if (otherMiddleware && otherMiddleware.length > 0) {
    // Run functions parallel or async for more page speed
    return parallel([...defaultMiddlewares, ...otherMiddleware]);
  }

  // Run functions parallel or async for more page speed
  return parallel(defaultMiddlewares);
};
