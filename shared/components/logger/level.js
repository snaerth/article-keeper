/**
 * The log levels in bunyan are as follows. The level
 * descriptions are best practice opinions of the author.
 * @param {Number} level
 * @returns {String} level
 */
export default function levels(level) {
  const arr = {
    10: 'trace', // Logging from external libraries used by your app or very detailed application logging.
    20: 'debug', // Anything else, i.e. too verbose to be included in "info" level.
    30: 'info', // Detail on regular operation.
    40: 'warn', // A note on something that should probably be looked at by an operator eventually.
    50: 'error', // Fatal for a particular request, but the service/app continues servicing other requests. An operator should look at this soon(ish).
    60: 'fatal', // The service/app is going to stop or become unusable now. An operator should definitely look into this soon.
  };

  return arr[level] || 'unknown';
}
