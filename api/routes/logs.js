import { isAdmin } from '../controllers/users';
import { getLogs, deleteLogs } from '../controllers/logs';

/**
 * Default Logs routes
 * @param {Object} app - Express app referece
 * @param {Func} requireAuth - authentication helper function
 * @returns {*}
 */
export default function(app, requireAuth) {
  app.post('/logs', [requireAuth, isAdmin], getLogs);
  app.delete('/logs', [requireAuth, isAdmin], deleteLogs);
}
