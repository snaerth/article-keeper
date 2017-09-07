import { isAdmin } from '../controllers/users';
import {
  getLogs,
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
  app.delete('/logs', [requireAuth, isAdmin], deleteAllLogs);
  app.delete('/log/:id', [requireAuth, isAdmin], deleteLogsById);
  app.post('/createfakelogs', [requireAuth, isAdmin], createFakeLogs);
}
