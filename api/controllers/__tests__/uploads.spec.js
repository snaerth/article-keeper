// import path from 'path';
// import mongoose from 'mongoose';
// import request from 'supertest';
// import express from 'express';
// import bodyParser from 'body-parser';
// import { checkFileAndDelete } from '../../services/fileService';
// import formidableMiddleware from '../../middleware/uploadHandlers';
// import User from '../../models/user';
// import { saveUser } from '../users';
// import uploadFiles from '../uploads';
// import config from '../../config';

// const { TEST_DB_URL, UPLOADS_ROOT } = config;
// const user = new User({
//   name: 'John Doe',
//   email: 'john@doe.com',
//   password: 'Password1',
// });
// const uploadDir = './api/controllers/__tests__/';

// // Initialize app
// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(
//   formidableMiddleware({
//     encoding: 'utf-8',
//     uploadDir: UPLOADS_ROOT,
//     multiples: true, // req.files to be arrays of files
//     keepExtensions: true,
//   }),
// );

// // Db connect
// beforeAll(async (done) => {
//   window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

//   try {
//     await mongoose.connect(TEST_DB_URL);
//     await saveUser(user);
//     done();
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// // Remove user from db and disconnect from db
// afterAll(async (done) => {
//   try {
//     await User.remove(user);
//     await mongoose.disconnect(done);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// POST request /uploads/images/news/
describe('POST /userimage', () => {
  // app.post('/uploads/images/news/', uploadFiles);
  // // app.post('/userimage', uploadUserImage);

  // test('Upload image and save image to filesystem', (done) => {
  //   request(app)
  //     .post('/uploads/images/news')
  //     .attach('images', path.resolve(__dirname, 'user.jpg'))
  //     .expect(200)
  //     .end((err, res) => {
  //       // Run tests on response
  //       expect(res.url).toMatch(/.jpg/);
  //       expect(res.thumbnail).toMatch(/thumbnail.jpg/);
  //       // Delete uploaded images
  //       checkFileAndDelete(uploadDir + res.url);
  //       checkFileAndDelete(uploadDir + res.thumbnail);

  //       if (err) return done(err);
  //     });
  // });
  test('Uploads test not finished', () => {
    expect(1).toBe(1);
  });
});
