import path from 'path';
import uuid from 'uuid/v1';
import { resizeImage } from '../services/imageService';
import { renameFile, checkFileAndDelete } from '../services/fileService';
import log from '../services/logService';

/**
 * Delete files in file system
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res
 * @author Snær Seljan Þóroddsson
 */
export function deleteFiles(req, res) {
  let { files } = req.body;
  files = files.split(',');

  if (!files[0]) {
    return res.status(422).send({ error: 'No files found in request' });
  }

  try {
    files.forEach(async (filePath) => {
      await checkFileAndDelete(`./${filePath}`);
    });

    return res.status(200).send({ success: 'Files deleted' });
  } catch (err) {
    log.error({ req, res, err }, 'Error deleting files');
    return res.status(422).send({ error: "Couldn't delete files" });
  }
}

/**
 * Saves image to file system
 *
 * @param {Object} image
 * @param {String} uploadDir
 * @return {Promise}
 * @author Snær Seljan Þóroddsson
 */
export async function saveImage(image, uploadDir) {
  return new Promise(async (resolve, reject) => {
    const ext = path.extname(image.name);
    const fileName = uuid();
    const imgPath = uploadDir + fileName + ext;
    const thumbnailPath = `${uploadDir}${`${fileName}-thumbnail${ext}`}`;

    try {
      const imageUrl = fileName + ext;
      await resizeImage(image.path, thumbnailPath, 27);
      await renameFile(image.path, imgPath);
      const thumbnailUrl = `${fileName}-thumbnail${ext}`;
      resolve({
        url: uploadDir + imageUrl,
        thumbnail: uploadDir + thumbnailUrl,
      });
    } catch (err) {
      log.error({ err }, 'Error saving image');
      return reject(err);
    }
  });
}

/**
 * Upload image to file system
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res
 * @author Snær Seljan Þóroddsson
 */
export default async function uploadFiles(req, res) {
  const images = req.files.images;
  if (Array.isArray(images)) {
    const promises = [];

    images.forEach((image) => {
      promises.push(saveImage(image, './media/news/'));
    });

    // Wait for all promises to resolve
    // Send array of imagesObj = [{url: '', thumbnail}, ...]
    Promise.all(promises).then((imagesArr) => res.status(200).send(imagesArr));
  } else if (images !== undefined) {
    const imageObj = await saveImage(images, './media/news/');
    return res.status(200).send([imageObj]);
  } else {
    return res.status(422).send({ error: 'Images required' });
  }
}
