import formidable from 'formidable';
import path from 'path';
import uuid from 'uuid/v1';
import { resizeImage } from '../services/imageService';
import { checkFileAndDelete, renameFile } from '../services/fileService';

export function deleteFiles(req, res) {
  res.send('Delete files');
}
/**
 * Upload image to file system
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res
 * @author Snær Seljan Þóroddsson */
export default function uploadFiles(req, res) {
  if (!req.uploadDir) {
    return res.status(500).send({ error: 'Upload directory missing' });
  }

  const form = formidable.IncomingForm({
    uploadDir: req.uploadDir,
  });

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
        return res.status(200).json({ url: imageUrl, thumbnail: thumbnailUrl });
      } catch (error) {
        return res.status(422).send({ error });
      }
    } else {
      return res.status(422).send({ error: 'Image required' });
    }
  });
}
