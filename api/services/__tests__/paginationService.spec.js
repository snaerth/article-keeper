// import mongoose from 'mongoose';
// import request from 'supertest';
// import config from '../../config';
// import log from '../logService';
// import Log from '../../models/log';

// const { TEST_DB_URL } = config;

// // Db connect
// beforeAll(async (done) => {
//   await mongoose.connect(TEST_DB_URL);
//   done();
// });

// // Remove user from db and disconnect from db
// afterAll(async (done) => {
//   await Log.collection.remove();
//   await mongoose.disconnect(done);
// });

// describe('Test for log service', () => {
//   // FileExists
//   test('Log error to mongodb', () => {
//     try {
//       request('')
//       log.info({ err: new Error('Þetta er villa') });
//       expect(1).toBe(1);
//     } catch (error) {
//       expect(error).toThrowErrorMatchingSnapshot();
//       throw new Error(error);
//     }
//   });
// });
