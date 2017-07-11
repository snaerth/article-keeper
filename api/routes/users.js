import { updateUser } from '../controllers/authentication';
import { uploadUserImage } from '../controllers/users';

/**
 * Default Admin routes
 * @param {Object} app - Express app referece
 * @param {Func} requireAuth - authentication helper function
 * @returns {undefined}
 */
export default function (app, requireAuth) {
  // Upload images
  app.post('/userimage', requireAuth, uploadUserImage);
  // Update user
  app.put('/user', requireAuth, updateUser);
}
