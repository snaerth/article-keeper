import passport from 'passport';
import {
  signin,
  signup,
  forgotPassword,
  resetPassword,
  removeUserProps,
} from '../controllers/authentication';
import { jwtLogin, localLogin, facebookLogin } from '../services/passport';
import { tokenForUser } from '../controllers/users';
import User from '../models/user';

// Tell passport to use strategys
passport.use(jwtLogin);
passport.use(localLogin);
passport.use(facebookLogin);

// Initialize require authentication helpers
const requireSignin = passport.authenticate('local');
const facebookAuth = passport.authenticate('facebook', {
  scope: ['email'],
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
        let newUser = new User(user);
        newUser = removeUserProps(newUser);
        // Store user and jwt token in a cookie
        res.cookie('user', {
          token: tokenForUser(newUser),
          ...newUser,
        });

        const expireTime = 30 * 24 * 60 * 1000; // 30 days
        res.cookie('userExpires', new Date(Date.now() + expireTime));

        return res.status(200).redirect('http://localhost:3000/profile');
      }

      return res.status(401).send('Access denied');
    },
  );
}
