import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import config from '../../config';
import {
  getUsers,
  getUser,
  deleteUser,
  createUser,
  updateUser,
  uploadUserImage,
} from '../../controllers/users';

const { TEST_DB_URL } = config;
// Initialize app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.Promise = global.Promise;

// Create user
app.post('/users', createUser);
// Get all users
app.get('/users', getUsers);
// Get user by search query
app.get('/users/:query', getUser);
// Update user
app.put('/users/:id', updateUser);
// Delete user
app.delete('/users/:id', deleteUser);
// Upload images
app.post('/users/userimage', uploadUserImage);

// Db connect
beforeAll(async (done) => {
  try {
    await mongoose.connect(TEST_DB_URL, { useMongoClient: true });
    done();
  } catch (error) {
    throw new Error(error);
  }
});

// After all tests have run
afterAll(async (done) => {
  try {
    await mongoose.disconnect(done);
  } catch (error) {
    throw new Error(error);
  }
});

describe('Run tests for users route handlers', () => {
  // // Create user
  test('Create user', () => {
    try {
      request(app)
        .post('/users')
        .send({
          name: 'Tester Testerson',
          password: 'Testerson1',
          email: 'tester2@tester.is',
          phone: '555-5555',
          dateOfBirth: 'Wed Apr 27 1983 00:00:00 GMT+0000 (Greenwich Standard Time)',
          roles: ['admin'],
        })
        .end((err, res) => {
          const user = res.body;
          expect(user.name).toEqual();
        });
    } catch (err) {
      expect(err).toThrowErrorMatchingSnapshot();
      throw new Error(err);
    }
  });

  // GET users
  test('Get users', () => {
    try {
      request(app)
        .get('/users')
        .query({
          limit: 50,
          page: 1,
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          const user = res.doc.body[0];
          expect(user).toHaveProperty('name');
          expect(user).toHaveProperty('email');
          expect(user).toHaveProperty('createdAt');
          expect(user).toHaveProperty('imageUrl');
          expect(user).toHaveProperty('thumbnailUrl');
          expect(user).toHaveProperty('dateOfBirth');
          expect(user).toHaveProperty('profile');
          expect(user).toHaveProperty('name');
          expect(user).toHaveProperty('facebook.email');
          expect(user).toHaveProperty('facebook.name');
          expect(user).toHaveProperty('twitter.email');
          expect(user).toHaveProperty('twitter.name');
          expect(user).toHaveProperty('google.email');
          expect(user).toHaveProperty('google.name');
        });
    } catch (err) {
      expect(err).toThrowErrorMatchingSnapshot();
      throw new Error(err);
    }
  });
});
