import pino from 'pino';
import ErrorLog from '../models/log';

/**
 * Logs error messages to error error-log file
 * @param {Any} message
 * @returns {Promise}
 */
export default function logError(message) {
  return new Promise((resolve, reject) => {
    try {
      const errorLog = new ErrorLog(pino().info(message));
      errorLog.save((error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      });
    } catch (error) {
      throw new Error(error);
    }
  });
}
