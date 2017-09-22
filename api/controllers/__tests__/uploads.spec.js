import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { checkFileAndDelete } from '../../services/fileService';
import formidableMiddleware from '../../middleware/uploadHandlers';
import uploadFiles, { saveImage } from '../uploads';
import config from '../../config';

const { TEST_DB_URL, UPLOADS_ROOT } = config;
const uploadDir = './api/controllers/__tests__/';

// Initialize app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  formidableMiddleware({
    encoding: 'utf-8',
    uploadDir: UPLOADS_ROOT,
    multiples: true, // req.files to be arrays of files
    keepExtensions: true,
  }),
);

mongoose.Promise = global.Promise;

// POST request /uploads/images/news/
app.post('/uploads/images/news/', uploadFiles);

// POST save image fake route
app.post('/saveimage/', async (req, res) => {
  const images = req.files.images;
  try {
    const imageObj = await saveImage(images, './media/news/');
    return res.status(200).send(imageObj);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// Db connect
beforeAll(async (done) => {
  try {
    await mongoose.connect(TEST_DB_URL, { useMongoClient: true });
    done();
  } catch (err) {
    throw new Error(err);
  }
});

// Remove user from db and disconnect from db
afterAll(async (done) => {
  try {
    await mongoose.disconnect(done);
  } catch (err) {
    throw new Error(err);
  }
});

describe('POST /userimage', () => {
  test('Upload image and save image to filesystem', () => {
    request(app)
      .post('/uploads/images/news')
      .attach('images', `${uploadDir}user.jpg`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw new Error(err);
        }
        const { url, thumbnail } = res.body[0];
        // Run tests on response
        expect(url).toMatch(/.jpg/);
        expect(thumbnail).toMatch(/thumbnail.jpg/);
        // Delete uploaded images
        checkFileAndDelete(url);
        checkFileAndDelete(thumbnail);
      });
  });

  // TODO saveImage and deleteFiles tests
  // Save image
  test('Save image to disk', () => {
    request(app)
      .post('/saveimage')
      .attach('images', `${uploadDir}user.jpg`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw new Error(err);
        }
        const { url, thumbnail } = res.body;
        // Run tests on response
        expect(url).toMatch(/.jpg/);
        expect(thumbnail).toMatch(/thumbnail.jpg/);
        // Delete uploaded images
        checkFileAndDelete(url);
        checkFileAndDelete(thumbnail);
      });
  });
});
