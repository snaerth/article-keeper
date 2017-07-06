import mongoose from 'mongoose';
import config from '../config';

const { TEST_DB_URL } = config;

// Connection to mongoose database
describe('Connect to MongoDB database', () => {
  beforeAll((done) => {
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
  });

  test('Connecion to database', () => {
    expect(1).toBe(1);
  });
});
