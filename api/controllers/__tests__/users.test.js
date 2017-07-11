import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import User from '../../models/user';
import { uploadUserImage } from '../users';
import config from '../../config';

const { TEST_DB_URL } = config;
const user = new User({
  name: 'John Doe',
  email: 'john@doe.com',
  password: 'Password1',
});
let app;

// Db connect
beforeAll(async (done) => {
  // Initialize app
  app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  await mongoose.connect(TEST_DB_URL);
  await saveUser(user);
  done();
});

// Remove user from db and disconnect from db
afterAll(async (done) => {
  await User.remove(user);
  await mongoose.disconnect(done);
});

// POST request /userimage
describe('POST /userimage', () => {
  app.post('/userimage', uploadUserImage);

  test('Upload image and save image to filesystem', (done) => {
    request(app)
      .post('/userimage')
      .send({ email: user.email })
      .attach('image', '__tests__/user.jpg')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json', done);
  });
});
