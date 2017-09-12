import { isAdmin } from '../controllers/users';
import {
  getLogs,
  getLogsBySearchQuery,
  deleteLogsById,
  deleteAllLogs,
  createFakeLogs,
} from '../controllers/logs';

/**
 * Default Logs routes
 * @param {Object} app - Express app referece
 * @param {Func} requireAuth - authentication helper function
 * @returns {*}
 */
export default function (app, requireAuth) {
  app.post('/logs', [requireAuth, isAdmin], getLogs);
  app.get('/logs/search/:query', [requireAuth, isAdmin], getLogsBySearchQuery);
  app.delete('/logs', [requireAuth, isAdmin], deleteAllLogs);
  app.delete('/log/:id', [requireAuth, isAdmin], deleteLogsById);
  app.post('/create-fake-logs', [requireAuth, isAdmin], createFakeLogs);
}
