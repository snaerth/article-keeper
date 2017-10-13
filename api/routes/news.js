import { isSuperUser } from '../controllers/users';
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
  app.get('/news', [requireAuth, isSuperUser], getNews);
  app.put('/news', [requireAuth, isSuperUser], updateNews);
  app.delete('/news', [requireAuth, isSuperUser], deleteNews);
  app.post('/news', [requireAuth, isSuperUser], createNews);
}
