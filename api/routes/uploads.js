import { isAdmin } from '../controllers/upload';
import { deleteFiles, uploadFiles } from '../controllers/news';

/**
 * Adds uploadDir property to request object
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next - callback
 * @returns {undefined}
 */
function addUploadDir(dir) {
  return (req, res, next) => {
    req.uploadDir = dir;
    next();
  };
}

/**
 * Default Upload routes
 * @param {Object} app - Express app referece
 * @param {Func} requireAuth - authentication helper function
 * @returns {undefined}
 */
export default function (app, requireAuth) {
  // Images
  app.delete('/upload/images', [requireAuth, isAdmin], deleteFiles);
  app.post(
    '/upload/images',
    [requireAuth, isAdmin, addUploadDir('./api/images/')],
    uploadFiles,
  );
  app.post(
    '/upload/images/news',
    [requireAuth, isAdmin, addUploadDir('./api/images/news')],
    uploadFiles,
  );
}
