import passport from 'passport';
import authentication from './authentication';
import news from './news';
import users from './users';

// Initialize require authentication helpers
const requireAuth = passport.authenticate('jwt');

/**
 * Default Admin routes
 * @param {Object} app - Express app referece
 * @returns {undefined}
 */
export default function (app) {
  authentication(app);
  news(app, requireAuth);
  users(app, requireAuth);
}
