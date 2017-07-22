import path from 'path';
import uuid from 'uuid/v1';
import { resizeImage } from '../services/imageService';
import { renameFile, checkFileAndDelete } from '../services/fileService';

/**
 * Delete files in file system
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res
 * @author Snær Seljan Þóroddsson
 */
export function deleteFiles(req, res) {
  let { images } = req.body;
  images = images.split(',');

  if (!images[0]) {
    return res.status(422).send({ error: 'No images found in request' });
  }

  try {
    images.forEach(async (imagePath) => {
      await checkFileAndDelete(`./${imagePath}`);
    });

    return res.status(200).send({ success: 'Images deleted' });
  } catch (error) {
    return res.status(422).send({ error: "Couldn't delete images" });
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
    } catch (error) {
      return reject(error);
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
      promises.push(saveImage(image, './images/news/'));
    });

    // Wait for all promises to resolve
    // Send array of imagesObj = [{url: '', thumbnail}, ...]
    Promise.all(promises).then(imagesArr => res.status(200).send(imagesArr));
  } else if (images !== undefined) {
    const imageObj = await saveImage(images, './images/news/');
    return res.status(200).send([imageObj]);
  } else {
    return res.status(422).send({ error: 'Images required' });
  }
}
