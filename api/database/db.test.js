import mongoose from 'mongoose';
import config from '../config';

const { TEST_DB_URL } = config;

// Connection to mongoose database
describe('Connect to MongoDB database', () => {
  beforeAll(() => {
    // Connect to database
    mongoose.connect(TEST_DB_URL);
  });

  test('Connecion to database', () => {
    expect(1).toBe(1);
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  });
});
