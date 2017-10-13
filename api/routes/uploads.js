import { isSuperUser } from '../controllers/users';
import uploadFiles, { deleteFiles } from '../controllers/uploads';

/**
 * Default Upload routes
 * @param {Object} app - Express app referece
 * @param {Func} requireAuth - authentication helper function
 * @returns {undefined}
 */
export default function (app, requireAuth) {
  // Images
  app.post('/uploads/images/news', [requireAuth, isSuperUser], uploadFiles);
  app.delete('/uploads/images/news', [requireAuth, isSuperUser], deleteFiles);
}
