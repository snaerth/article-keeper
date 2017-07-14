import { uploadUserImage, updateUser } from '../controllers/users';

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
 * Default Admin routes
 * @param {Object} app - Express app referece
 * @param {Func} requireAuth - authentication helper function
 * @returns {undefined}
 */
export default function (app, requireAuth) {
  // Upload images
  app.post(
    '/userimage',
    [requireAuth, addUploadDir('./public/images/users/')],
    uploadUserImage,
  );
  // Update user
  app.put('/user', requireAuth, updateUser);
}
