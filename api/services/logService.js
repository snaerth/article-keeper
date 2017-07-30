import pino from 'pino';
import fs from 'fs';

/**
 * Logs error messages to error error-log file
 * @param {Any} message
 * @returns {Promise}
 */
export default function logError(message) {
  return new Promise(async (resolve) => {
    try {
      await pino(fs.createWriteStream('./error.log')).info(message);
      return resolve();
    } catch (error) {
      throw new Error(error);
    }
  });
}
