import { isAdmin } from '../controllers/users';
import uploadFiles from '../controllers/uploads';

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
  app.post(
    '/upload/images',
    [requireAuth, isAdmin, addUploadDir('./uploads/images/')],
    uploadFiles,
  );
  app.post(
    '/upload/images/news',
    [requireAuth, isAdmin, addUploadDir('./uploads/images/news/')],
    uploadFiles,
  );
}
