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
 *
 * @param {Object} app - Express app referece
 * @param {Func} requireAuth - authentication helper function
 */
export default function (app, requireAuth) {
  // Get all logs
  app.get('/logs', [requireAuth, isAdmin], getLogs);
  // Get logs by search query
  app.get('/logs/:query', [requireAuth, isAdmin], getLogsBySearchQuery);
  // Delete all logs
  app.delete('/logs', [requireAuth, isAdmin], deleteAllLogs);
  // Get log by id
  app.delete('/logs/:id', [requireAuth, isAdmin], deleteLogsById);
  // Create fake logs
  app.post('/logs/create-fake-logs', [requireAuth, isAdmin], createFakeLogs);
}
