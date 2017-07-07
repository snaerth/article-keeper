import mongoose from 'mongoose';
import User from '../models/user';
import config from '../config';
import { validateSignup, saveUser } from './authentication';

const { TEST_DB_URL } = config;

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
  const user = new User({
    name: 'John Doe',
    email: 'john@doe.com',
    password: 'Password1',
  });

  let data;

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
      expect(error.message).toEqual(
        'E11000 duplicate key error collection: test.users index: email_1 dup key: { : "john@doe.com" }',
      );
    }
  });

  afterAll(async (done) => {
    await User.remove(data);
    await mongoose.disconnect(done);
  });
});
