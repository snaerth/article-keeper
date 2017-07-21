import passport from 'passport';
import authentication from './authentication';
import news from './news';
import users from './users';
import uploads from './uploads';

// Initialize require authentication helpers
const requireAuth = passport.authenticate('jwt');

/**
 * Default Admin routes
 * @param {Object} app - Express app referece
 * @returns {undefined}
 */
export default function (app) {
  authentication(app, requireAuth);
  news(app, requireAuth);
  users(app, requireAuth);
  uploads(app, requireAuth);
}
