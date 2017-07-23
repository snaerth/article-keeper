import passport from 'passport';
import {
  signin,
  signup,
  forgotPassword,
  resetPassword,
  successFacebookCallback,
  signOut,
} from '../controllers/authentication';
import { jwtLogin, localLogin, facebookLogin } from '../services/passport';
import config from '../config';

// VARIABLES
const { PORT, HOST, PROTOCOL } = config;
const signinUrl = `${PROTOCOL}://${HOST}:${PORT}/signin`;

// Tell passport to use strategys
passport.use(jwtLogin);
passport.use(localLogin);
passport.use(facebookLogin);

// Initialize require authentication helpers
const requireSigninSetup = passport.authenticate('local');
const facebookAuthSetup = passport.authenticate('facebook', {
  scope: ['email'],
});
const facebookCallbackSetup = passport.authenticate('facebook', {
  session: false,
  failureRedirect: signinUrl,
});

/**
 * Default Authentication routes
 * @param {Object} app - Express app referece
 * @returns {undefined}
 */
export default function (app) {
  // Authentication
  // Signup
  app.post('/signup', signup);

  // Signin
  app.post('/signin', requireSigninSetup, signin);

  // Signout
  app.get('/signout', signOut);

  // Forgot password
  app.post('/forgot', forgotPassword);

  // Reset password
  app.post('/reset/:token', resetPassword);

  // Facebook authentication
  app.get('/auth/facebook', facebookAuthSetup);

  // Facebook auth callback
  app.get(
    '/auth/facebook/callback',
    facebookCallbackSetup,
    successFacebookCallback,
  );
}
