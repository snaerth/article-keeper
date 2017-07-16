import jwt from 'jwt-simple';
import path from 'path';
import uuid from 'uuid/v1';
import User from '../models/user';
import { resizeImage } from '../services/imageService';
import { checkFileAndDelete, renameFile } from '../services/fileService';
import { removeUserProps, validateSignup } from './authentication';
import config from '../config';

const { UPLOADS_ROOT } = config;

/**
 * Gets token for user
 * @param {Object} user - User object
 * @returns {String} token - Newly created token
 */
export function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode(
    {
      sub: user.id,
      iat: timestamp,
    },
    process.env.JWT_SECRET,
  );
}

/**
 * Find user by email. If user is found then return user
 *
 * @param {String} email
 * @returns {Promise}
 * @author Snær Seljan Þóroddsson
 */
export async function findUserByEmail(email) {
  try {
    // See if user with given email exists
    const user = await User.findOne({
      email,
    });

    // If a user does exist, return error
    if (!user) {
      return Promise.reject('No user found');
    }

    return Promise.resolve(user);
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Create new user and save to database
 *
 * @param {Object} user - Mongoose user schema object
 * @param {Object} propsToDelArr - Array of properites to delete
 * @returns {Promise}
 * @author Snær Seljan Þóroddsson
 */
export async function saveUser(user) {
  if (user.constructor.name === 'model') {
    try {
      // Save user to database
      await user.save();
      return Promise.resolve(user);
    } catch (error) {
      throw new Error(error);
    }
  } else {
    throw new Error('Object is not a mongoose object');
  }
}

/**
 * Upload user image to file system
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res
 * @author Snær Seljan Þóroddsson */
export async function uploadUserImage(req, res) {
  const image = req.files.image;

  if (image) {
    try {
      const { email } = req.user;
      const user = await findUserByEmail(email);
      const uploadDir = 'images/users/';
      const ext = path.extname(image.name);
      const fileName = uuid();
      // File system path to image
      const imgPath = UPLOADS_ROOT + uploadDir + fileName + ext;
      // File system path to thumbnail image
      const thumbnailPath = `${UPLOADS_ROOT + uploadDir}${`${fileName}-thumbnail${ext}`}`;
      const { imageUrl, thumbnailUrl } = user;

      if (imageUrl) {
        await checkFileAndDelete(UPLOADS_ROOT + imageUrl);
      }

      if (thumbnailUrl) {
        await checkFileAndDelete(UPLOADS_ROOT + thumbnailUrl);
      }

      await resizeImage(image.path, thumbnailPath, 27);
      await renameFile(image.path, imgPath);

      user.imageUrl = uploadDir + fileName + ext;
      user.thumbnailUrl = `${uploadDir + fileName}-thumbnail${ext}`;
      // Update user
      const updatedUser = await saveUser(user);
      // Remove unwanted props for client
      const newUser = removeUserProps(user);
      // Send response object with user token and user information
      return res.status(200).send({
        token: tokenForUser(updatedUser),
        ...newUser,
      });
    } catch (error) {
      return res.status(422).send({ error });
    }
  } else {
    return res.status(422).send({ error: 'Image required' });
  }
}

/**
 * Check whether user has admin roles
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Func} next
 * @returns {undefined
 * @author Snær Seljan Þóroddsson
 */
export function isAdmin(req, res, next) {
  if (req.user && req.user.roles.includes('admin')) {
    return next();
  }

  return res.status(401).send({ error: 'Unauthorized' });
}

/**
 * Checks if user exist by email.
 * If user is found notify that email is in use
 *
 * @param {String} email
 * @returns {Promise}
 * @author Snær Seljan Þóroddsson
 */
export async function checkUserByEmail(email) {
  try {
    // See if user with given email exists
    const user = await User.findOne({
      email,
    });
    // If a user does exist, return error
    if (user) {
      throw new Error('Email is in use');
    }

    return Promise.resolve();
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Updates user and save to database
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res
 * @author Snær Seljan Þóroddsson
 */
export async function updateUser(req, res) {
  if (!req.body) return res.status(422).send({ error: 'No post data found' });
  if (!req.user) return res.status(422).send({ error: 'No user found' });

  const { email, password, newPassword, name, dateOfBirth, phone } = req.body;
  // Validate post request inputs
  const error = validateSignup({
    email,
    password,
    newPassword,
    name,
    dateOfBirth,
  });

  if (!error) {
    try {
      // Find user by email and populate user props
      const user = await findUserByEmail(email);
      user.email = email;
      user.password = password;
      user.name = name;
      user.dateOfBirth = dateOfBirth;
      user.phone = phone;

      return user.comparePassword(password, async (err, isMatch) => {
        if (err) {
          return Promise.reject({ error: err });
        }

        if (!isMatch) {
          return Promise.reject({
            error: 'Password does not match old password',
          });
        }

        user.password = newPassword;
        // Save new user to databases
        const updatedUser = await saveUser(user);
        // Remove unwanted props for client
        const newUser = removeUserProps(user);
        // Send response object with user token and user information
        return res.status(200).json({
          token: tokenForUser(updatedUser),
          ...newUser,
        });
      });
    } catch (err) {
      return res.status(422).send({ error: err });
    }
  } else {
    return res.status(422).send({ error });
  }
}

/**
 * Finds user by email,if user exist
 * set resetPasswordToken and resetPasswordExpires props
 * save those props to user
 *
 * @param {Object} props - Token for user and email
 * @returns {Promise} promise - user
 * @author Snær Seljan Þóroddsson
 */
export async function attachTokenToUser({ token, email }) {
  const hourInSeconds = 60 * 60 * 1000; // 1 hour

  try {
    const user = User.findOne({
      email,
    });

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + hourInSeconds;

    // Save user to databases
    await saveUser(user);
    // Remove unwanted props for client
    return removeUserProps(user);
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Finds user, updates properties (password, resetPasswordToken, resetPasswordExpires)
 * and saves user with new propertys
 *
 * @param {String} token
 * @param {String} password
 * @returns {undefined}
 * @author Snær Seljan Þóroddsson
 */
export async function updateUserPassword({ token, password }) {
  const hourInSeconds = 60 * 60 * 1000;

  try {
    const user = User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: Date.now() - hourInSeconds,
      },
    });

    if (!user) {
      return Promise.reject({
        error: 'Password reset token is invalid or has expired.',
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save user to databases
    await user.save();
    return Promise.resolve(user);
  } catch (error) {
    throw new Error(error);
  }
}
