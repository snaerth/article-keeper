import path from 'path';
import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { checkFileAndDelete } from '../../services/fileService';
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

  try {
    await mongoose.connect(TEST_DB_URL);
    await saveUser(user);
    done();
  } catch (error) {
    throw new Error(error);
  }
});

// Remove user from db and disconnect from db
afterAll(async (done) => {
  try {
    await User.remove(user);
    await mongoose.disconnect(done);
  } catch (error) {
    throw new Error(error);
  }
});

// POST request /userimage
describe('POST /userimage', () => {
  const uploadDir = './api/controllers/__tests__/';
  app.post(
    '/userimage',
    (req, res, next) => {
      req.uploadDir = uploadDir;
      next();
    },
    uploadUserImage,
  );

  test('Upload image and save image to filesystem', (done) => {
    request(app)
      .post('/upload/images/news')
      .type('form')
      .attach('image', path.resolve(__dirname, 'user.jpg'))
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        const { url, thumbnail } = res.body;
        // Run tests on response
        expect(url).toMatch(/.jpg/);
        expect(thumbnail).toMatch(/thumbnail.jpg/);
        // Delete uploaded images
        checkFileAndDelete(uploadDir + url);
        checkFileAndDelete(uploadDir + thumbnail);

        if (err) return done(err);
      });
  });
});
