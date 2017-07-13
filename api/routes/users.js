import { uploadUserImage, updateUser } from '../controllers/users';

/**
 * Adds uploadDir property to request object
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next - callback
 * @returns {undefined}
 */
function addUploadDir(req, res, next) {
  req.uploadDir = './public/images/users/';
  next();
}

/**
 * Default Admin routes
 * @param {Object} app - Express app referece
 * @param {Func} requireAuth - authentication helper function
 * @returns {undefined}
 */
export default function (app, requireAuth) {
  // Upload images
  app.post('/userimage', [requireAuth, addUploadDir], uploadUserImage);
  // Update user
  app.put('/user', requireAuth, updateUser);
}
