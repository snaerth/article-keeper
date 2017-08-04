import fs from 'fs';
import rimraf from 'rimraf';
import log from '../services/logService';

/**
 * Creates default directorys
 *
 * @param {Array} directorys
 * @returns {undefined}
 * @author Snær Seljan Þóroddsson
 */
export function createDirectorys(
  directorys = [
    'public',
    'public/images',
    'uploads',
    'media',
    'media/users',
    'media/news',
  ],
) {
  for (let i = 0, len = directorys.length; i < len; i++) {
    const dir = directorys[i];
    fs.exists(dir, (exists) => {
      if (!exists) {
        fs.mkdir(dir, (err) => {
          if (err) {
            log.error({ err }, 'Error creating directorys');
            throw new Error(`Failed to create directory ${dir}`);
          }
        });
      }
    });
  }
}

/**
 * Delete directorys
 *
  * @param {Array} directorys
 * @returns {undefined}
 * @author Snær Seljan Þóroddsson
 */
export function deleteDirectorys(directorys) {
  for (let i = 0, len = directorys.length; i < len; i++) {
    const dir = directorys[i];
    fs.exists(dir, (exists) => {
      if (exists) {
        rimraf(dir, (err) => {
          if (err) {
            log.error({ err }, 'Error deleteing directorys');
            throw new Error(`Failed to delete directory ${dir}`);
          }
        });
      }
    });
  }
}

/**
 * Deletes file from file system
 *
 * @param {String} filePath - Path to file to delete
 * @returns {Promise}
 * @author Snær Seljan Þóroddsson
 */
export function deleteFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (error) => {
      if (error) {
        return reject(error);
      }

      return resolve(filePath);
    });
  });
}

/**
 * Create file in file system
 *
 * @param {string | Buffer | integer} filePath
 * @param {string | Buffer | Uint8Array} data
 * @param {Object | string} options
 * @returns {Promise}
 * @author Snær Seljan Þóroddsson
 */
export function createFile(filePath, data, options = '') {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, options, (error) => {
      if (error) {
        return reject(error);
      }

      return resolve(filePath);
    });
  });
}

/**
 * Rename file in file system
 *
 * @param {string} filePath
 * @param {string} newFilePath
 * @returns {Promise}
 * @author Snær Seljan Þóroddsson
 */
export function renameFile(filePath, newFilePath) {
  return new Promise((resolve, reject) => {
    fs.rename(filePath, newFilePath, (error) => {
      if (error) {
        return reject(error);
      }

      return resolve(filePath);
    });
  });
}

/**
 * Checks if file exists
 *
 * @param {String} filePath - Path to file to delete
 * @returns {Promise}
 * @author Snær Seljan Þóroddsson
 */
export function fileExists(filePath) {
  return new Promise((resolve) => {
    fs.exists(filePath, (exists) => {
      if (!exists) {
        return resolve(false);
      }

      return resolve(true);
    });
  });
}

/**
 * Checks if file exist and if exist then deletes file
 *
 * @param {String} filePath - Path to file to delete
 * @returns {Promise}
 * @author Snær Seljan Þóroddsson
 */
export async function checkFileAndDelete(filePath) {
  return new Promise(async (resolve, reject) => {
    try {
      const exist = await fileExists(filePath);
      if (exist) {
        await deleteFile(filePath);
        return resolve(filePath);
      }

      return resolve(false);
    } catch (err) {
      log.error({ err }, 'Error in check if file exist and then delete');
      return reject(err);
    }
  });
}
