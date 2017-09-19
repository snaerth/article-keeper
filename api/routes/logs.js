import { isAdmin } from '../controllers/users';
import {
  getLogs,
  getLogsBySearchQuery,
  getLogsByDateRange,
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
export default function(app, requireAuth) {
  app.get('/logs', [requireAuth, isAdmin], getLogs);
  app.get('/logs/search/:query', [requireAuth, isAdmin], getLogsBySearchQuery);
  app.get(
    '/logs/search/:startDate/:endDate',
    [requireAuth, isAdmin],
    getLogsByDateRange
  );
  app.delete('/logs', [requireAuth, isAdmin], deleteAllLogs);
  app.delete('/logs/:id', [requireAuth, isAdmin], deleteLogsById);
  app.post('/logs/create-fake-logs', [requireAuth, isAdmin], createFakeLogs);
}
