import log from '../services/logService';

/**
* Handle 404 errors.
* Note: the react application middleware hands 404 paths, but it is good to
* have this backup for paths not handled by the universal middleware. For
* example you may bind a /api path to express.
* @param {Object} req - Request object
* @param {Object} res - Response object
* @returns {undefined}
*/
function notFoundMiddlware(req, res) {
  return res.status(404).send({
    status: 404,
    message: 'Page not found',
  });
}

/**
* Handle all unhandled errors. Typically you want to return a "500" response status.
* Note: You must provide specify all 4 parameters on this callback function
* even if they aren't used, otherwise it won't be used.
* @param {Object} err - Error object
* @param {Object} req - Request object
* @param {Object} res - Response object
* @param {Function} next - Express next function
* @returns {undefined}
*/
function unhandledErrorMiddleware(err, req, res, next) {
  log.error({ req, res, err }, 'Unhandled error middleware');

  res
    .set('content-type', 'text/html')
    .status(500)
    .send(`</head><body><h1>500 Server Error</h1><p>${err}</p></body></html>`)
    .end();
  return next(err);
}

export default [notFoundMiddlware, unhandledErrorMiddleware];
