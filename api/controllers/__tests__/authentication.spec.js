import mongoose from 'mongoose';
import User from '../../models/user';
import config from '../../config';
import { validateSignup, removeUserProps } from '../authentication';
import { saveUser, checkUserByEmail } from '../users';

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

// Db connect
beforeAll(async (done) => {
  await mongoose.connect(TEST_DB_URL);
  done();
});

// Remove user from db and disconnect from db
afterAll(async (done) => {
  await User.collection.remove();
  await mongoose.disconnect(done);
});

// Save user to database
describe('Save mongoose user model to database', async () => {
  // Save user to db
  test('Save user to db', async () => {
    try {
      const data = await saveUser(user);
      expect(data.name).toBe(user.name);
      expect(data.email).toBe(user.email);
      // Remove user from db
      await User.remove(user);
    } catch (error) {
      expect(error.message).toContain('E11000 duplicate');
    }
  });
});

// Check if user exist in db
describe('Check if user exist', async () => {
  // Save user to db
  test('Find user in db', async () => {
    try {
      // Check if user exist
      const checkUser = await checkUserByEmail(user.email);
      expect(checkUser).toBe(undefined);
      // Save user to db
      await saveUser(user);
      // Check if user exist
      await checkUserByEmail(user.email);
      // Remove user from db
      await User.remove(user);
    } catch (error) {
      expect(error).toThrowErrorMatchingSnapshot();
    }
  });
});
