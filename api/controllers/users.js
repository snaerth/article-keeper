import mongoose from 'mongoose';
import jwt from 'jwt-simple';
import path from 'path';
import uuid from 'uuid/v1';
import User from '../models/user';
import { resizeImage } from '../services/imageService';
import createPaginationObject from '../services/paginationService';
import { checkFileAndDelete, renameFile } from '../services/fileService';
import dbSortValues from '../services/dbService';
import log from '../services/logService';
import parseDateYearMonthDay from '../utils/date';

import { removeUserProps, validateSignup } from './authentication';

// Sort values for sorting in db
const sortVals = dbSortValues(); // [-1,1,'asc','desc']
// Properties to select from user collection in db
const select = {
  name: 1,
  email: 1,
  createdAt: 1,
  roles: 1,
  imageUrl: 1,
  thumbnailUrl: 1,
  dateOfBirth: 1,
  profile: 1,
  'facebook.email': 1,
  'facebook.name': 1,
  'twitter.email': 1,
  'twitter.name': 1,
  'google.email': 1,
  'google.name': 1,
};

/**
 * Gets token for user
 * @param {Object} user - User object
 * @returns {String} token - Newly created token
 */
export function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode(
    {
      sub: user._id, // eslint-disable-line
      iat: timestamp,
    },
    process.env.JWT_SECRET,
  );
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
 * Enriches pagination object with sort and other pagination properties
 *
 * @param {Object} pagination - { limit: Number, offset: Number }
 * @param {String|Number} name
 * @param {String|Number} email
 * @param {String|Number} dateOfBirth
 * @returns {Object} sort
 */
function addToPaginationObject(
  pagination,
  name = 1,
  email = 1,
  dateOfBirth = 1,
) {
  const sort = {};
  if (sortVals.includes(name)) sort.name = name;
  if (sortVals.includes(email)) sort.email = email;
  if (sortVals.includes(dateOfBirth)) sort.dateOfBirth = dateOfBirth;
  if (Object.keys(sort).length !== 0) {
    pagination.sort = sort;
  }

  return pagination;
}

/**
 * Find user by email. If user is found then return user
 *
 * @param {String} email
 * @returns {Promise}
 * @author Snær Seljan Þóroddsson
 */
export async function findUserByEmail(email) {
  return new Promise(async (resolve, reject) => {
    try {
      // See if user with given email exists
      const user = await User.findOne({
        email,
      });

      // If a user does exist, return error
      if (!user) {
        return reject('No user found');
      }

      return resolve(user);
    } catch (err) {
      log.error({ err }, 'Error finding user by email');
      return reject(err);
    }
  });
}

/**
 * Create new user and save to database
 *
 * @param {Object} user - Mongoose user schema object
 * @param {Object} propsToDelArr - Array of properites to delete
 * @returns {Promise}
 * @author Snær Seljan Þóroddsson
 */
export function saveUser(user) {
  return new Promise(async (resolve, reject) => {
    if (user.constructor.name === 'model') {
      try {
        // Save user to database
        const newUser = await user.save();
        log.info({ info: newUser }, `User ${newUser.name} saved in db`);
        return resolve(newUser);
      } catch (err) {
        log.error({ err }, 'Error saving user');
        return reject(err);
      }
    } else {
      log.error(
        { err: new Error('Object is not a mongoose object') },
        'Object is not a mongoose object',
      );

      return reject('Object is not a mongoose object');
    }
  });
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
      const uploadDir = './media/users/';
      const ext = path.extname(image.name);
      const fileName = uuid();
      // File system path to image
      const imgPath = uploadDir + fileName + ext;
      // File system path to thumbnail image
      const thumbnailPath = `${uploadDir}${`${fileName}-thumbnail${ext}`}`;
      const { imageUrl, thumbnailUrl } = user;

      if (imageUrl) {
        await checkFileAndDelete(imageUrl);
      }

      if (thumbnailUrl) {
        await checkFileAndDelete(thumbnailUrl);
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
    } catch (err) {
      log.error({ req, res, err }, 'Error uploading user image');
      return res.status(422).send({ error: err });
    }
  } else {
    return res.status(422).send({ error: 'Image required' });
  }
}

/**
 * Checks if user exist by email.
 * If user is found notify that email is in use
 *
 * @param {String} email
 * @returns {Promise}
 * @author Snær Seljan Þóroddsson
 */
export function checkUserByEmail(email) {
  return new Promise(async (resolve, reject) => {
    try {
      // See if user with given email exists
      const user = await User.findOne({
        email,
      });
      // If a user does exist, return error
      if (user) {
        return reject('Email is in use');
      }

      return resolve();
    } catch (err) {
      log.error({ err }, 'Error checking if user exist by email');

      return reject(err);
    }
  });
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
  return new Promise(async (resolve, reject) => {
    const hourInSeconds = 60 * 60 * 1000; // 1 hour

    try {
      const user = await findUserByEmail(email);
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + hourInSeconds;

      // Save user to databases
      await saveUser(user);
      // Remove unwanted props for client
      return resolve(removeUserProps(user));
    } catch (err) {
      log.error({ err }, 'Error attaching token to user object');

      return reject(err);
    }
  });
}

/**
 * Finds user, updates properties (password, resetPasswordToken, resetPasswordExpires)
 * and saves user with new propertys
 *
 * @param {String} token
 * @param {String} password
 * @returns {Promise}
 * @author Snær Seljan Þóroddsson
 */
export async function updateUserPassword({ token, password }) {
  return new Promise(async (resolve, reject) => {
    const hourInSeconds = 60 * 60 * 1000;

    try {
      const user = User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: {
          $gt: Date.now() - hourInSeconds,
        },
      });

      if (!user) {
        return reject({
          error: 'Password reset token is invalid or has expired.',
        });
      }

      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      // Save user to databases
      await user.save();
      // Log in db
      log.info({ info: user }, `Update password for user ${user.name}`);

      return resolve(user);
    } catch (err) {
      log.error({ err }, 'Error updating user password');

      return reject(err);
    }
  });
}

/**
 * Create user
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res
 * @author Snær Seljan Þóroddsson
 */
export async function createUser(req, res) {
  if (!req.body) return res.status(422).send('No post data found');
  const { email, password, name, phone, roles, dateOfBirth } = req.body;

  // Validate post request inputs
  const validateError = validateSignup({
    email,
    password,
    newPassword: null,
    name,
    dateOfBirth,
    phone,
  });

  if (!validateError) {
    try {
      // Check for if user exists by email
      await checkUserByEmail(email);

      const user = new User({
        name,
        email,
        password,
        dateOfBirth,
        phone,
        roles: Array.isArray(roles) && roles.includes('admin')
          ? ['user', 'admin']
          : ['user'],
      });
      // Save user in database
      await saveUser(user);
      // Remove unwanted props for client
      const newUser = removeUserProps(user);
      // Send response object with user token and user information
      return res.status(200).json({
        ...newUser,
      });
    } catch (err) {
      log.error({ req, res, err }, 'Error creating user');
      return res.status(422).send({ error: err });
    }
  } else {
    return res.status(422).send({ error: validateError });
  }
}

/**
 * Delete user
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res
 * @author Snær Seljan Þóroddsson
 */
export async function deleteUser(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ error: 'No id found in query string' });
  }

  try {
    const user = await User.findByIdAndRemove(id);
    if (user) {
      // Log in db
      log.info(
        { req, res, info: `User ${user.email} deleted` },
        `User ${user.email} deleted`,
      );
      return res
        .status(200)
        .send({ success: `User ${user.email} successfully deleted` });
    }

    return res.status(404).send(`User ${id} not found`);
  } catch (err) {
    log.error({ req, res, err }, `Error deleting user ${id}`);
    return res.status(500).send({ error: err });
  }
}

/**
 * Get user by search query
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res
 * @author Snær Seljan Þóroddsson
 */
export async function getUser(req, res) {
  const { page, limit, startDate, endDate } = req.query;
  const { query } = req.params;

  if (!query) {
    return res.status(422).send({
      error: 'Parameter query is required to perform user search',
    });
  }
  // Get default pagination object
  const pagination = createPaginationObject(page, limit);
  // Only select these properties
  pagination.select = select;

  const searchQuery = {};
  const $or = [];

  if (query) {
    // Check if searchQuery is valid mongo ObjectId
    if (query.match(/^[0-9a-fA-F]{24}$/)) {
      // Search query by id
      $or.push({ _id: mongoose.Types.ObjectId(query) });
    } else {
      const reExp = new RegExp(query, 'i');
      // Search query for for other User properties
      $or.push({ name: reExp }, { email: reExp }, { roles: reExp });
    }
  }

  try {
    if (startDate && endDate) {
      const gte = await parseDateYearMonthDay(startDate);
      const lte = await parseDateYearMonthDay(endDate);

      // Search query for text search and date range
      searchQuery.$and = [
        {
          $or,
        },
        {
          createdAt: { $gte: gte, $lte: lte },
        },
        {
          dateOfBirth: { $gte: gte, $lte: lte },
        },
      ];
    } else {
      // Search query for text search
      searchQuery.$or = $or;
    }
    // Fetch user by search query from database
    const result = await User.paginate(searchQuery, pagination);
    return res.status(200).send(result);
  } catch (err) {
    log.error({ req, res, err }, `Error getting user by search query ${query}`);
    return res.status(500).send({ error: err });
  }
}

/**
 * Get all users
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res
 * @author Snær Seljan Þóroddsson
 */
export async function getUsers(req, res) {
  const {
    limit,
    name,
    email,
    dateOfBirth,
    page,
    query,
    startDate,
    endDate,
  } = req.query;

  // Get default pagination object
  let pagination = createPaginationObject(page, limit);
  // Enrich pagination object
  pagination = addToPaginationObject(pagination, name, email, dateOfBirth);
  // Only select these properties
  pagination.select = select;

  const searchQuery = {};
  const $or = [];
  let emptySearch = false;

  if (query) {
    // Check if searchQuery is valid mongo ObjectId
    if (query.match(/^[0-9a-fA-F]{24}$/)) {
      // Search query by id
      $or.push({ _id: mongoose.Types.ObjectId(query) });
    } else {
      const reExp = new RegExp(query, 'i');
      // Search query for for other User properties
      $or.push({ name: reExp }, { email: reExp }, { roles: reExp });
    }
  }

  try {
    if (startDate && endDate) {
      const gte = await parseDateYearMonthDay(startDate);
      const lte = await parseDateYearMonthDay(endDate);

      // Search query for text search and date range
      searchQuery.$and = [
        {
          createdAt: { $gte: gte, $lte: lte },
        },
        {
          dateOfBirth: { $gte: gte, $lte: lte },
        },
      ];
    }

    // Search query for text search
    if ($or.length > 0) {
      searchQuery.$and.push({ $or });
    }

    if (searchQuery.$and && searchQuery.$and.length === 0) {
      emptySearch = true;
    }

    // Fetch Users from database
    const result = await User.paginate(
      !emptySearch ? searchQuery : {},
      pagination,
    );
    return res.status(200).send(result);
  } catch (err) {
    log.error({ req, res, err }, 'Error getting users');
    return res.status(500).send({ error: err });
  }
}

/**
 * Updates user without comparing password and save to database
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res
 * @author Snær Seljan Þóroddsson
 */
export async function updateUser(req, res) {
  if (!req.body) return res.status(422).send('No post data found');
  if (!req.user) return res.status(422).send('No user found');

  const { email, password, name, dateOfBirth, phone, roles } = req.body;
  // Validate post request inputs
  const error = validateSignup({
    email,
    password,
    newPassword: null,
    name,
    dateOfBirth,
    phone,
  });

  if (!error) {
    try {
      // Find user by email and populate user props
      const user = await findUserByEmail(email);
      if (user.email) user.email = email;
      if (user.password) user.password = password;
      if (user.name) user.name = name;
      if (user.dateOfBirth) user.dateOfBirth = dateOfBirth;
      if (user.phone) user.phone = phone;
      if (roles) {
        user.roles = Array.isArray(roles) && roles.includes('admin')
          ? ['user', 'admin']
          : ['user'];
      }

      // Save new user to databases
      const updatedUser = await saveUser(user);
      // Log in db
      log.info(
        { req, res, info: updatedUser },
        `User ${updatedUser.email} updated in db`,
      );

      // Remove unwanted props for client
      const newUser = removeUserProps(updatedUser);
      // Send response object with user token and user information
      return res.status(200).json(newUser);
    } catch (err) {
      log.error({ req, res, err }, 'Error updating user');

      return res.status(422).send({ error: err });
    }
  } else {
    return res.status(422).send({ error });
  }
}
