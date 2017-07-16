import path from 'path';
import uuid from 'uuid/v1';
import { resizeImage } from '../services/imageService';
import { renameFile, checkFileAndDelete } from '../services/fileService';
import config from '../config';

const { UPLOADS_ROOT } = config;

/**
 * Delete files in file system
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res
 * @author Snær Seljan Þóroddsson +
 */
export function deleteFiles(req, res) {
  let { images } = req.body;
  images = images.split(',');

  if (!images[0]) {
    return res.status(422).send({ error: 'No images found in request' });
  }

  try {
    images.forEach(async (imagePath) => {
      await checkFileAndDelete(UPLOADS_ROOT + imagePath);
    });

    return res.status(200).send({ success: 'Images deleted' });
  } catch (error) {
    return res.status(422).send({ error: "Couldn't delete images" });
  }
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
  const image = req.files.image;

  if (image) {
    const uploadDir = 'images/news/';
    const ext = path.extname(image.name);
    const fileName = uuid();
    const imgPath = UPLOADS_ROOT + uploadDir + fileName + ext;
    const thumbnailPath = `${UPLOADS_ROOT + uploadDir}${`${fileName}-thumbnail${ext}`}`;

    try {
      const imageUrl = fileName + ext;
      await resizeImage(image.path, thumbnailPath, 27);
      await renameFile(image.path, imgPath);
      const thumbnailUrl = `${fileName}-thumbnail${ext}`;
      // Send images url to client
      return res.status(200).json({
        url: uploadDir + imageUrl,
        thumbnail: uploadDir + thumbnailUrl,
      });
    } catch (error) {
      return res.status(422).send({ error });
    }
  } else {
    return res.status(422).send({ error: 'Image required' });
  }
}
