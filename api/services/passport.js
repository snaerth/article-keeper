import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import LocalStrategy from 'passport-local';
import fetch from 'node-fetch';
import fileType from 'file-type';
import uuid from 'uuid/v1';
import config from '../config';
import User from '../models/user';
import { saveImageToDisk, resizeImage } from '../services/imageService';

// VARIABLES
const {
  JWT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  API_PROTOCOL,
  API_HOST,
  API_PORT,
} = config;

/**
 * Fetches images by photoUrl,
 * Converts to buffer and saves image and creates thumbnail image
 *
 * @param {string} photoUrl
 * @returns {Object} paths to image and thumbnail image on file system
 */
async function saveImages(photoUrl) {
  // Fetch image from facebook
  const res = await fetch(photoUrl);
  // Change response into buffer
  const buffer = await res.buffer();
  // Get buffer extension
  const ext = fileType(buffer).ext;
  // Create uniqe id
  const fileName = uuid();
  const uploadDir = 'images/users/';
  const imageName = fileName + ext;
  const imagePath = `${uploadDir}${`${imageName}.${ext}`}`;
  const thumbnailPath = `${uploadDir}${`${imageName}-thumbnail.${ext}`}`;
  // Save image to filesystem
  await saveImageToDisk(buffer, `./${imagePath}`);
  // Resize image for thumbnail
  await resizeImage(imagePath, `./${thumbnailPath}`, 27);

  return {
    imageUrl: imagePath,
    thumbnailUrl: thumbnailPath,
  };
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
      },
    );
  },
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
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
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

export const facebookLogin = new FacebookStrategy(
  facebookOptions,
  (accessToken, refreshToken, profile, done) => {
    const { emails, photos, id, displayName } = profile;

    process.nextTick(() => {
      // Find the user in the database based on their facebook id
      User.findOne(
        { 'facebook.id': id, email: emails[0].value },
        async (err, user) => {
          if (err) {
            return done(err);
          }

          if (user) {
            return done(null, user);
          }

          try {
            const { imageUrl, thumbnailUrl } = await saveImages(
              photos[0].value,
            );
            // if there is no user found with that facebook id, create them
            const newUser = new User();
            newUser.email = emails[0].value;
            newUser.name = displayName;
            newUser.imageUrl = imageUrl; // images.url;
            newUser.thumbnailUrl = thumbnailUrl; // images.thumbnail;
            newUser.facebook.id = id;
            newUser.facebook.token = accessToken;
            newUser.facebook.name = displayName;
            newUser.facebook.email = emails[0].value;
            // save our user to the database
            return newUser.save((error) => {
              if (error) {
                return done(error);
              }
              // if successful, return the new user
              return done(null, newUser);
            });
          } catch (error) {
            return done(err);
          }
        },
      );
    });
  },
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
