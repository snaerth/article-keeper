import fs from 'fs';

const directorys = ['public', 'public/images', 'public/images/users'];

/**
 * Creates default directorys for project if they dont exist
 *
 * @returns {undefined}
 * @author Snær Seljan Þóroddsson
 */
export function createDefaultDirectorys() {
  for (let i = 0, len = directorys.length; i < len; i++) {
    const dir = directorys[i];
    fs.exists(dir, (exists) => {
      if (!exists) {
        fs.mkdir(dir, (error) => {
          if (error) {
            throw new Error(`Failed to create directory ${dir}`);
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

      return resolve();
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
  return new Promise((resolve, reject) => {
    fs.exists(filePath, (exists) => {
      if (!exists) {
        return reject('File does not exist.');
      }

      return resolve();
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
  try {
    await fileExists(filePath);
    await deleteFile(filePath);
    return filePath;
  } catch (error) {
    return error;
  }
}
