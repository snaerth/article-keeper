import jwt from 'jwt-simple';
import crypto from 'crypto';
import formidable from 'formidable';
import path from 'path';
import uuid from 'uuid/v1';
import { validateEmail } from '../services/utils';
import sendMail from '../services/mailService';
import { resizeImage } from '../services/imageService';
import { checkFileAndDelete } from '../services/fileService';
import User from '../models/user';
import config from '../config';

// VARIABLES
const { PORT, HOST } = config;

/**
 * Checks if user exist by email.
 * If user is found notify that email is in use
 *
 * @param {String} email
 * @returns {Promise}
 * @author Snær Seljan Þóroddsson
 */
async function checkUserByEmail(email) {
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
 * Validates email, password name, etc. from post request
 * If error then return error string
 *
 * @param {String} email
 * @param {String} password
 * @param {String} newPassword
 * @param {String} name
 * @param {String} dateOfBirth
 * @param {Object} res
 * @returns {String} error
 * @author Snær Seljan Þóroddsson
 */
export function validateSignup({
  email,
  password,
  newPassword,
  name,
  dateOfBirth,
}) {
  // Check if email, password or message exist in request
  if (!email || !password || !name) {
    return 'You must provide name, email and password';
  }
  // Validate email
  if (!validateEmail(email)) {
    return `${email} is not a valid email`;
  }

  // Check if password length is longer then 6 characters
  if (password.length < 6) {
    return 'Password must be of minimum length 6 characters';
  }
  // Check if password contains one number and one uppercase letter
  if (!/[0-9]/.test(password) || !/[A-Z]/.test(password)) {
    return 'Password must contain at least one number (0-9) and one uppercase letter (A-Z)';
  }

  if (newPassword) {
    // Check if password length is longer then 6 characters
    if (newPassword.length < 6) {
      return 'New password must be of minimum length 6 characters';
    }
    // Check if password contains one number and one uppercase letter
    if (!/[0-9]/.test(newPassword) || !/[A-Z]/.test(newPassword)) {
      return 'New password must contain at least one number (0-9) and one uppercase letter (A-Z)';
    }
  }

  // Name has to have aleast two names
  if (!/^([^0-9]*)$/.test(name) || name.trim().split(' ').length < 2) {
    return 'Name has aleast two 2 names consisting of letters';
  }

  if (dateOfBirth && !Date.parse(dateOfBirth)) {
    return 'Date is not in valid format. Try DD.MM.YYYY';
  }

  return null;
}

/**
 * Removes properties from mongoose user schema object
 *
 * @param {Object} user - Mongoose user schema object
 * @param {Array} moreProps - Array of strings to remove from user object
 * @returns {Object} newUser
 */
export function removeUserProps(user, moreProps) {
  let delProps = ['__v', '_id', 'createdAt', 'password'];
  delProps = moreProps && moreProps.length
    ? delProps.concat(moreProps)
    : delProps;
  const newUser = user.toObject();

  for (let i = 0; i < delProps.length; i++) {
    const hasBarProperty = Object.prototype.hasOwnProperty.call(
      newUser,
      delProps[i],
    );

    if (hasBarProperty) {
      delete newUser[delProps[i]];
    }
  }

  return newUser;
}

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
 * Sign up route
 * Sign user up to system. If no errors create user
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res
 * @returns {undefined}
 * @author Snær Seljan Þóroddsson
 */
export async function signup(req, res) {
  if (!req.body) {
    return res.status(422).send({ error: 'No post data found' });
  }

  const { email, password, name } = req.body;
  // Validate post request inputs
  const error = validateSignup({ email, password, name });

  if (!error) {
    try {
      // Check for if user exists by email
      await checkUserByEmail(email);
      const user = new User({ name, email, password });
      // Save user in database
      const data = await saveUser(user);
      // Remove unwanted props for client
      const newUser = removeUserProps(user);
      // Send response object with user token and user information
      return res.status(200).json({
        token: tokenForUser(data),
        ...newUser,
      });
    } catch (err) {
      return res.status(422).send({ error: err });
    }
  } else {
    return res.status(422).send({ error });
  }
}

/**
 * Find user by email. If user is found then return user
 *
 * @param {String} email
 * @returns {Promise}
 * @author Snær Seljan Þóroddsson
 */
async function findUserByEmail(email) {
  try {
    // See if user with given email exists
    const user = await User.findOne({
      email,
    });

    // If a user does exist, return error
    if (!user) {
      throw new Error('No user found');
    }

    return Promise.resolve(user);
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
 * Upload user image to file system
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res
 * @author Snær Seljan Þóroddsson */
export function uploadUserImage(req, res) {
  const { email } = req.user;
  const form = formidable.IncomingForm({ uploadDir: './public/images/users/' });

  form.on('error', () =>
    res.status(500).send({ error: 'An error has occured with image upload' }),
  );

  form.parse(req, async (err, fields, files) => {
    const image = files.image;

    if (image) {
      const ext = path.extname(image.name);
      const fileName = uuid();
      const imgPath = form.uploadDir + fileName + ext;
      const thumbnailPath = `${form.uploadDir}${`${fileName}-thumbnail${ext}`}`;

      try {
        const user = await findUserByEmail(email);
        const { imageUrl, thumbnailUrl } = user;

        if (imageUrl) {
          await checkFileAndDelete(form.uploadDir + imageUrl);
        }

        if (thumbnailUrl) {
          await checkFileAndDelete(form.uploadDir + thumbnailUrl);
        }

        user.imageUrl = fileName + ext;
        await resizeImage(image.path, imgPath, 400);
        await resizeImage(image.path, thumbnailPath, 27);

        user.thumbnailUrl = `${fileName}-thumbnail${ext}`;
        await checkFileAndDelete(image.path);
        const updatedUser = await saveUser(user);
        // Remove unwanted props for client
        const newUser = removeUserProps(user);
        // Send response object with user token and user information
        return res.status(200).json({
          token: tokenForUser(updatedUser),
          ...newUser,
        });
      } catch (error) {
        return res.status(422).send({ error });
      }
    } else {
      return res.status(422).send({ error: 'Image required' });
    }
  });
}

/**
 * Signin route
 * If users is authenticated responde with a token
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {undefined}
 * @author Snær Seljan Þóroddsson
 */
export function signin(req, res) {
  const user = req.user;
  let data = null;

  if (user) {
    const userObject = removeUserProps(user);

    data = {
      token: tokenForUser(user),
      ...userObject,
    };

    if (user.roles.includes('admin')) {
      data.role = 'admin';
    }
  }

  res.send(data);
}

/**
 * Generates uniq token
 *
 * @returns {Promise} promise - Token
 * @author Snær Seljan Þóroddsson
 */
async function createRandomToken() {
  try {
    // Create buffer
    const buffer = await crypto.randomBytes(20);
    const token = buffer.toString('hex');
    return Promise.resolve(token);
  } catch (error) {
    throw new Error(error);
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
async function attachTokenToUser({ token, email }) {
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
 * Send reset password email
 *
 * @returns {Promise} promise - User
 * @author Snær Seljan Þóroddsson
 */
async function sendResetPasswordEmail({ url, email, name }) {
  const mailOptions = {
    to: email,
    subject: 'Password reset',
    text: 'Password reset',
    html: `
          <p>Hi ${name}</p>
          <p>We've received a request to reset your password. If you didn't make the request</p>
          <p>just ignore this email. Otherwise you can reset your password using this link:</p>
          <a href="http://${url}">Click here to reset your password</a>
          <p>Thank you.</p>
      `,
  };

  const { to, subject, text, html } = mailOptions;

  try {
    // Send email
    const info = await sendMail(to, subject, text, html);
    // Return info and email
    return Promise.resolve({ info, email });
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Forgot password route
 * TODO describe info
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {undefined}
 * @author Snær Seljan Þóroddsson
 */
export async function forgotPassword(req, res) {
  const { email } = req.body;

  // Create token Save resetPasswordToken and resetPasswordExpires to user Send
  // email to user
  try {
    const token = await createRandomToken();
    const { user } = await attachTokenToUser({ token, email });
    const url = `${HOST}:${PORT}/reset/${token}`;
    const { name } = user;
    const data = await sendResetPasswordEmail({ url, email, name });
    return res.send(
      `An e-mail has been sent to ${data.email} with further instructions.`,
    );
  } catch (error) {
    return res
      .status(550)
      .send({ error: "Coundn't reset password at this time.", err: error });
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
async function updateUserPassword({ token, password }) {
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

/**
 * Resets user password
 * Finds user by resetPasswordToken property and resetPasswordExpires
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {undefined}
 * @author Snær Seljan Þóroddsson
 */
export async function resetPassword(req, res) {
  const token = req.params.token;
  const password = req.body.password;

  if (token && password) {
    try {
      const user = await updateUserPassword({ token, password });
      return res.send(
        `Success! Your password has been changed for ${user.email}.`,
      );
    } catch (error) {
      return res.send({ error: 'Password is invalid or token has expired.' });
    }
  } else {
    return res.send({ error: 'Token and password are required' });
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
