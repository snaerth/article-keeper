import path from 'path';
import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import User from '../../models/user';
import { uploadUserImage, saveUser } from '../users';
import config from '../../config';

const { TEST_DB_URL } = config;
const user = new User({
  name: 'John Doe',
  email: 'john@doe.com',
  password: 'Password1',
});

// Initialize app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Db connect
beforeAll(async (done) => {
  window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
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

  const reqParams = {
    email: user.email,
  };

  test('Upload image and save image to filesystem', (done) => {
    request(app)
      .post('/userimage')
      .field('user', reqParams.toString())
      .attach('image', path.resolve(__dirname, 'user.jpg'))
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        console.log(res.body);
        if (err) {
          console.error(res.error);
        }
        done(err);
      });
  });
});
