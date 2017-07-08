import mongoose from 'mongoose';
import User from '../models/user';
import config from '../config';
import {
  validateSignup,
  saveUser,
  checkUserByEmail,
  removeUserProps,
} from './authentication';

const { TEST_DB_URL } = config;
const user = new User({
  name: 'John Doe',
  email: 'john@doe.com',
  password: 'Password1',
});

// Validate signup form fields
describe('Validate signup form fields from post request', () => {
  test('Validates signup fields', () => {
    const isValid = validateSignup({
      email: 'snaerth@gmail.com',
      password: 'ThisIsAPassword1',
      newPassword: 'ThisIsAPassword2',
      name: 'John Smith',
      dateOfBirth: new Date(),
    });

    expect(isValid).toBe(null);
  });
});

// Save user to database
describe('Save mongoose user model to database', async () => {
  let data;

  // Db connect
  beforeAll(async (done) => {
    await mongoose.connect(TEST_DB_URL);
    done();
  });

  // Save user to db
  test('Save user to db', async () => {
    try {
      data = await saveUser(user);
      expect(data.name).toBe(user.name);
      expect(data.email).toBe(user.email);
    } catch (error) {
      expect(error.message).toContain('E11000 duplicate');
    }
  });

  // Remove user from db and disconnect from db
  afterAll(async (done) => {
    await User.remove(data);
    await mongoose.disconnect(done);
  });
});

// Check if user exist in db
describe('Check if user exist', async () => {
  let data;

  // Database connect
  beforeAll(async (done) => {
    await mongoose.connect(TEST_DB_URL);
    done();
  });

  // Save user to db
  test('Find user in db', async () => {
    try {
      // Check if user exist
      const checkUser = await checkUserByEmail(user.email);
      expect(checkUser).toBe(undefined);
      // Save user to db
      data = await saveUser(user);
      // Check if user exist
      await checkUserByEmail(user.email);
    } catch (error) {
      expect(error).toBe('Email is in use');
    }
  });

  // Remove user from db and disconnect from db
  afterAll(async (done) => {
    await User.remove(data);
    await mongoose.disconnect(done);
  });
});

// Remove props from mongoose user model
describe('Remove props from mongoose user model', () => {
  const userObj = {
    name: 'John Doe',
    email: 'john@doe.com',
    password: 'Password1',
  };
  const user1 = new User(userObj);
  const user2 = new User(userObj);

  test('Remove props from object', () => {
    expect(user2.toObject()).toHaveProperty('password', 'Password1');
    const newUser = removeUserProps(user1);
    expect(newUser).not.toHaveProperty('password');
  });
});
