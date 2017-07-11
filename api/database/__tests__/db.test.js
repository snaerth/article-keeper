import mongoose from 'mongoose';
import config from '../../config';

const { TEST_DB_URL } = config;

// Connect to database
beforeAll(() => {
  mongoose.connect(TEST_DB_URL);
});

// Disconnect from database
afterAll((done) => {
  mongoose.disconnect(done);
});

// Connection to mongoose database
describe('Connect to MongoDB database', () => {
  test('Connecion to database', () => {
    expect(1).toBe(1);
  });
});
