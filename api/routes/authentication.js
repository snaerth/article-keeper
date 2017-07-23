import passport from 'passport';
import {
  signin,
  signup,
  forgotPassword,
  resetPassword,
  successSocialCallback,
  errorSocialCallback,
  signOut,
} from '../controllers/authentication';
import {
  jwtLogin,
  localLogin,
  facebookLogin,
  twitterLogin,
  googleLogin,
} from '../services/passport';
import config from '../config';

// VARIABLES
const { PORT, HOST, PROTOCOL } = config;
const signinUrl = `${PROTOCOL}://${HOST}:${PORT}/signin`;

// Tell passport to use strategys
passport.use(jwtLogin);
passport.use(localLogin);
passport.use(facebookLogin);
passport.use(twitterLogin);
passport.use(googleLogin);

// Initialize require authentication helpers

// Local passport
const requireSigninSetup = passport.authenticate('local');

// Facebook passport
const facebookAuthSetup = passport.authenticate('facebook', {
  scope: ['email'],
});
const facebookCallbackSetup = passport.authenticate('facebook', {
  session: false,
  failureRedirect: signinUrl,
});

// Twitter passport
const twitterAuthSetup = passport.authenticate('twitter', {
  scope: ['include_email=true'],
});
const twitterCallbackSetup = passport.authenticate('twitter', {
  session: false,
  failureRedirect: signinUrl,
});

// Google passport
const googleAuthSetup = passport.authenticate('google', {
  scope: ['email'],
});
const googleCallbackSetup = passport.authenticate('google', {
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
    successSocialCallback,
    errorSocialCallback,
  );

  // Twitter authentication
  app.get('/auth/twitter', twitterAuthSetup);

  // Twitter auth callback
  app.get(
    '/auth/twitter/callback',
    twitterCallbackSetup,
    successSocialCallback,
    errorSocialCallback,
  );

  // Google authentication
  app.get('/auth/google', googleAuthSetup);

  // Google auth callback
  app.get(
    '/auth/google/callback',
    googleCallbackSetup,
    successSocialCallback,
    errorSocialCallback,
  );
}
