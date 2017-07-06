import mongoose from 'mongoose';
import User from '../models/user';
import config from '../config';
import { validateSignup, saveUser } from './authentication';

const { TEST_DB_URL } = config;

/**
 * Database connection helper
 * @param {func} done
 */
function dataBaseConnection(done) {
  const options = {
    server: {
      reconnectTries: 10,
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 0,
      },
    },
  };

  // Connect to database
  mongoose.connect(TEST_DB_URL, options);

  mongoose.connection.on('error', (error) => {
    done.fail(error);
  });

  mongoose.connection.on('open', () => {
    done();
  });
}

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
describe('Save user to database', async () => {
  beforeAll((done) => {
    dataBaseConnection(done);
  });

  test('Save mongoose user to database', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'Password1',
    });

    const data = await saveUser(user);
    // TODO fix error in test
    expect(data.name).toBe(user.name);
    expect(data).toMatchSnapshot();
  });

  // TODO remove user from database

  // afterAll(() => {

  // });
});
