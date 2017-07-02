import fs from 'fs';
import Jimp from 'jimp';
/**
 * Resizes image and saves to file system
 *
 * @param {String} orginalPath - orginal image path
 * @param {String} newPath - New image path
 * @param {Int} width
 * @param {Int} height
 * @returns {Promise}
 * @author Snær Seljan Þóroddsson
 */
export function resizeImage(orginalPath, newPath, width, height) {
  return new Promise((resolve, reject) => {
    Jimp.read(orginalPath)
      .then((image) => {
        image
          .resize(width || Jimp.AUTO, height || Jimp.AUTO) // resize
          .quality(100) // set JPEG quality
          .write(newPath, resolve(image)); // save
      })
      .catch(error => reject(error));
  });
}

/**
 * Checks if file is image
 *
 * @param {Object} file - Image binary data
 * @returns {Promise}
 * @author Snær Seljan Þóroddsson
 */
export function isImage(file) {
  return new Promise((resolve, reject) => {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return reject('Only image files are allowed!');
    }

    return resolve();
  });
}

/**
 * Saves image to files system
 *
 * @param {String} data - String of data
 * @param {String} path - Path to save file
 * @returns {Promise}
 * @author Snær Seljan Þóroddsson
 */
export function saveImageToDisk(data, path) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'binary', (error) => {
      if (error) {
        return reject('Cound not save image');
      }

      return resolve();
    });
  });
}
