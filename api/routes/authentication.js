import passport from 'passport';
import {
  signin,
  signup,
  forgotPassword,
  resetPassword,
} from '../controllers/authentication';
import { jwtLogin, localLogin, facebookLogin } from '../services/passport';
import { tokenForUser } from './users';

// Tell passport to use strategys
passport.use(jwtLogin);
passport.use(localLogin);
passport.use(facebookLogin);

// Initialize require authentication helpers
const requireSignin = passport.authenticate('local');
const facebookAuth = passport.authenticate('facebook', {
  scope: ['email'],
  authType: 'rerequest',
});

/**
 * Default Authentication routes
 * @param {Object} app - Express app referece
 * @returns {undefined}
 */
export default function (app) {
  // Authentication
  app.post('/signup', signup);
  app.post('/signin', requireSignin, signin);
  app.post('/forgot', forgotPassword);
  app.post('/reset/:token', resetPassword);
  // Facebook authentication
  app.get('/auth/facebook', facebookAuth);

  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
      session: false,
      failureRedirect: 'http://localhost:3000/signin',
    }),
    (req, res) => {
      const { user } = req;
      if (user) {
        res.redirect('http://localhost:3000/profile/?id=');
      }
      // TODO: not logged in
      res.send('Access denied');
    },
  );
}
