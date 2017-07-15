import formidable from 'formidable';
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
      await checkFileAndDelete(`./uploads/${imagePath}`);
    });

    res.status(200).send({ success: 'Images deleted' });
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
export default function uploadFiles(req, res) {
  const uploadDir = req.uploadDir;

  if (!uploadDir) {
    return res.status(500).send({ error: 'Upload directory missing' });
  }

  const form = formidable.IncomingForm({
    uploadDir,
  });

  const outDir = uploadDir.indexOf('./uploads/') > -1
    ? uploadDir.replace('./uploads/', '')
    : uploadDir;

  form.on('error', () =>
    res.status(500).send({ error: 'An error has occured with image upload' }),
  );

  form.parse(req, async (err, fields, files) => {
    const image = files.image;

    if (image) {
      const ext = path.extname(image.name);
      const fileName = uuid();
      const imgPath = form.uploadDir + fileName + ext;
      const thumbnailPath = `${form.uploadDir}${`${fileName}-thumbnail${ext}`}`;

      try {
        const imageUrl = fileName + ext;
        await resizeImage(image.path, thumbnailPath, 27);
        await renameFile(image.path, imgPath);
        const thumbnailUrl = `${fileName}-thumbnail${ext}`;
        return res.status(200).json({
          url: outDir + imageUrl,
          thumbnail: outDir + thumbnailUrl,
        });
      } catch (error) {
        return res.status(422).send({ error });
      }
    } else {
      return res.status(422).send({ error: 'Image required' });
    }
  });
}
