import passport from 'passport';
import {
  signin,
  signup,
  forgotPassword,
  resetPassword,
} from '../controllers/authentication';
import { jwtLogin, localLogin, facebookLogin } from '../services/passport';

// Tell passport to use strategys
passport.use(jwtLogin);
passport.use(localLogin);
passport.use(facebookLogin);

// Initialize require authentication helpers
const requireSignin = passport.authenticate('local');
const facebookAuth = passport.authenticate('facebook', { scope: ['email'] });
const facebookAuthCallback = passport.authenticate('facebook', {
  successRedirect: 'http://localhost:30030/auth/success',
  failureRedirect: 'http://localhost:3000/signin',
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

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback', facebookAuthCallback);
  /* GET Twitter View Page */
  app.get('/auth/success', (req, res) => {
    res.render('twitter', { user: req.user });
  });
}
