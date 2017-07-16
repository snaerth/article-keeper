import { uploadUserImage, updateUser } from '../controllers/users';
import formidableMiddleware from '../middleware/uploadHandlers';

/**
 * Default Admin routes
 * @param {Object} app - Express app referece
 * @param {Func} requireAuth - authentication helper function
 * @returns {undefined}
 */
export default function (app, requireAuth) {
  // Upload images
  app.post('/userimage', [requireAuth, formidableMiddleware], uploadUserImage);
  // Update user
  app.put('/user', requireAuth, updateUser);
}
