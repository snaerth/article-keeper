import fs from 'fs';
import Jimp from 'jimp';
import fetch from 'node-fetch';
import fileType from 'file-type';
import uuid from 'uuid/v1';
import log from '../services/logService';

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
      .then(image => {
        image
          .resize(width || Jimp.AUTO, height || Jimp.AUTO) // resize
          .quality(100) // set JPEG quality
          .write(newPath, resolve(newPath)); // save
      })
      .catch(err => {
        log.error({ err }, 'Error resizing image');
        return reject(err);
      });
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
    file = file.originalname || file;
    if (!file) {
      return reject('Parameter file is undefined');
    }
    // accept image only
    if (!file.match(/\.(jpg|jpeg|png|gif)$/)) {
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
    fs.writeFile(path, data, 'binary', err => {
      if (err) {
        log.error({ err }, 'Error saving image to disk');
        return reject('Cound not save image');
      }

      return resolve();
    });
  });
}

/**
 * Fetches images by photoUrl,
 * Converts to buffer and saves image and creates thumbnail image
 *
 * @param {string} photoUrl
 * @param {string} uploadDir
 * @returns {Object} paths to image and thumbnail image on file system
 */
export async function saveImageFromUrl(photoUrl, uploadDir) {
  // Fetch image from facebook
  const res = await fetch(photoUrl);
  // Change response into buffer
  const buffer = await res.buffer();
  // Get buffer extension
  const ext = fileType(buffer).ext;
  // Create uniqe id
  const fileName = uuid();
  const imageName = fileName + ext;
  const imagePath = `${uploadDir}${`${imageName}.${ext}`}`;
  const thumbnailPath = `${uploadDir}${`${imageName}-thumbnail.${ext}`}`;
  // Save image to filesystem
  await saveImageToDisk(buffer, `./${imagePath}`);
  // Resize image for thumbnail
  await resizeImage(imagePath, `./${thumbnailPath}`, 27);

  return {
    imageUrl: imagePath,
    thumbnailUrl: thumbnailPath
  };
}
