import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import LocalStrategy from 'passport-local';
import config from '../config';
import User from '../models/user';
import { saveImageFromUrl } from '../services/imageService';
import log from '../services/logService';

// VARIABLES
const {
  JWT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  API_PROTOCOL,
  API_HOST,
  API_PORT,
} = config;

/**
 * Saves new user to db
 *
 * @param {Object} newUser - Mongoose user model
 * @param {Func} done
 * @returns {Func} callback function
 */
function saveUser(newUser, done) {
  // save our user to the database
  return newUser.save(error => {
    if (error) {
      return done(error);
    }
    // if successful, return the new user
    return done(null, newUser);
  });
}

// Setup options for local strategy
const localOptions = {
  usernameField: 'email',
  passwordField: 'password',
};

// Create local strategy
export const localLogin = new LocalStrategy(
  localOptions,
  (email, password, done) => {
    // Verify username and passport, call done with that user if correct credentials
    // otherwise call done with false
    User.findOne(
      {
        email,
      },
      (error, user) => {
        if (error) {
          return done(error);
        }

        if (!user) {
          return done(null, false);
        }

        // Compare password to encrypted password
        return user.comparePassword(password, (err, isMatch) => {
          // eslint-disable-line
          if (err) {
            return done(err);
          }

          if (!isMatch) {
            return done(null, false);
          }

          return done(null, user);
        });
      }
    );
  }
);

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWT_SECRET,
};

// Create JWT Strategy
export const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // Check if user ID in the payload exist in database
  User.findById(payload.sub, (error, user) => {
    if (error) return done(error, false);

    // If user exists call done with that user
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
});

// Configure the Facebook strategy for use by Passport.
const facebookOptions = {
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: `${API_PROTOCOL}://${API_HOST}:${API_PORT}/auth/facebook/callback`,
  profileFields: [
    'id',
    'displayName',
    'picture.type(large)',
    'email',
    'birthday',
    'cover',
  ],
  enableProof: true,
};

// Create facebook strategy
export const facebookLogin = new FacebookStrategy(
  facebookOptions,
  (accessToken, refreshToken, profile, done) => {
    const { emails, photos, id, displayName } = profile;
    const email = emails[0].value;

    process.nextTick(() => {
      // Find the user in the database based on their facebook id
      User.findOne({ 'facebook.id': id }, async (err, user) => {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, user);
        }

        try {
          const { imageUrl, thumbnailUrl } = await saveImageFromUrl(
            photos[0].value,
            'media/users/'
          );
          // If no user found with that facebook id or email create new user
          // Map facebook response to mongoose user object
          const newUser = new User();
          newUser.name = displayName;
          newUser.imageUrl = imageUrl;
          newUser.thumbnailUrl = thumbnailUrl;
          newUser.profile = 'FACEBOOK';
          newUser.facebook.id = id;
          newUser.facebook.token = accessToken;
          newUser.facebook.name = displayName;
          newUser.facebook.email = email;
          newUser.facebook.image = photos[0].value;

          return saveUser(newUser, done);
        } catch (error) {
          log.error({ err: error }, 'Error facebook login.');
          return done(error);
        }
      });
    });
  }
);

// Configure the Twitter strategy for use by Passport.
const twitterOptions = {
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: `${API_PROTOCOL}://${API_HOST}:${API_PORT}/auth/twitter/callback`,
  enableProof: true,
  includeEmail: true,
};

// Create facebook strategy
export const twitterLogin = new TwitterStrategy(
  twitterOptions,
  (token, tokenSecret, profile, done) => {
    const { photos, id, displayName } = profile;

    process.nextTick(() => {
      // Find the user in the database based on their facebook id
      User.findOne({ 'twitter.id': id }, async (err, user) => {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, user);
        }

        try {
          const { imageUrl, thumbnailUrl } = await saveImageFromUrl(
            photos[0].value.replace('_normal', ''),
            'media/users/'
          );
          // If no user found with that facebook id or email create new user
          // Map facebook response to mongoose user object
          const newUser = new User();
          newUser.name = displayName;
          newUser.imageUrl = imageUrl;
          newUser.thumbnailUrl = thumbnailUrl;
          newUser.profile = 'TWITTER';
          newUser.twitter.id = id;
          newUser.twitter.token = token;
          newUser.twitter.name = displayName;
          newUser.twitter.email = '';
          newUser.twitter.image = photos[0].value;

          return saveUser(newUser, done);
        } catch (error) {
          log.error({ err: error }, 'Error twitter login.');
          return done(err);
        }
      });
    });
  }
);

// Configure the Twitter strategy for use by Passport.
const googleOptions = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${API_PROTOCOL}://${API_HOST}:${API_PORT}/auth/google/callback`,
};

// Create google strategy
export const googleLogin = new GoogleStrategy(
  googleOptions,
  (accessToken, refreshToken, profile, done) => {
    const { email, photos, id, displayName } = profile;

    process.nextTick(() => {
      // Find the user in the database based on their facebook id
      User.findOne({ 'google.id': id }, async (err, user) => {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, user);
        }

        try {
          const { imageUrl, thumbnailUrl } = await saveImageFromUrl(
            photos[0].value.replace(/^(.+?\.(png|jpe?g)).*$/i, '$1'),
            'media/users/'
          );
          // If no user found with that facebook id or email create new user
          // Map facebook response to mongoose user object
          const newUser = new User();
          newUser.name = displayName;
          newUser.imageUrl = imageUrl;
          newUser.thumbnailUrl = thumbnailUrl;
          newUser.profile = 'GOOGLE';
          newUser.google.id = id;
          newUser.google.token = accessToken;
          newUser.google.name = displayName;
          newUser.google.email = email;
          newUser.google.image = photos[0].value;

          return saveUser(newUser, done);
        } catch (error) {
          log.error({ err: error }, 'Error google login.');
          return done(err);
        }
      });
    });
  }
);

// Only the user ID is serialized to the session, keeping the amount of data
// stored within the session small
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// When subsequent requests are received, this ID is used to find the user,
// which will be restored to req.user
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
