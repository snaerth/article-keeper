import { isAdmin } from '../controllers/authentication';
import {
  getNews,
  deleteNews,
  createNews,
  updateNews,
} from '../controllers/news';

/**
 * Default News routes
 * @param {Object} app - Express app referece
 * @param {Func} requireAuth - authentication helper function
 * @returns {undefined}
 */
export default function (app, requireAuth) {
  // News
  app.get('/news', [requireAuth, isAdmin], getNews);
  app.put('/news', [requireAuth, isAdmin], updateNews);
  app.delete('/news', [requireAuth, isAdmin], deleteNews);
  app.post('/news', [requireAuth, isAdmin], createNews);
}
