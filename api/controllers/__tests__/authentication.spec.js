import mongoose from 'mongoose';
import User from '../../models/user';
import config from '../../config';
import { validateSignup, removeUserProps } from '../authentication';
import { saveUser, checkUserByEmail } from '../users';

const { TEST_DB_URL } = config;
const user = new User({
  name: 'John Doe',
  email: 'john@doe.com',
  password: 'Password1'
});

const user1 = new User(user);
const user2 = new User(user);

// Db connect
beforeAll(async done => {
  await mongoose.connect(TEST_DB_URL, { useMongoClient: true });
  done();
});

// Remove user from db and disconnect from db
afterAll(async done => {
  await User.collection.remove();
  await mongoose.disconnect(done);
});

// Validate signup form fields
describe('Statrt authentication tests', () => {
  // Validate signup
  test('Validates signup fields', () => {
    const isValid = validateSignup({
      email: 'snaerth@gmail.com',
      password: 'ThisIsAPassword1',
      newPassword: 'ThisIsAPassword2',
      name: 'John Smith',
      dateOfBirth: new Date()
    });

    expect(isValid).toBe(null);
  });

  // Remove props from mongoose user model
  test('Remove props from mongoose user model', () => {
    expect(user2.toObject()).toHaveProperty('password', 'Password1');
    const newUser = removeUserProps(user1);
    expect(newUser).not.toHaveProperty('password');
  });

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

  // Check if user exist in db
  // Save user to db
  test('Check if user exist and find user in db', async () => {
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
