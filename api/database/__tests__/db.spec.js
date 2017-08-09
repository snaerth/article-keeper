import mongoose from 'mongoose';
import { createAdminUser } from '../db';
import config from '../../config';

const { TEST_DB_URL } = config;
// Connect to database
beforeAll(() => {
  mongoose.connect(TEST_DB_URL, { useMongoClient: true });
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

  test('Create admin user', async () => {
    const user = await createAdminUser();
    expect(user.email).toBe('admin@admin.com');
    const expected = ['admin', 'user'];
    expect(user.roles).toEqual(expect.arrayContaining(expected));
  });
});
