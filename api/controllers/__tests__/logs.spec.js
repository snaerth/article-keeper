import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import config from '../../config';
import log from '../../services/logService';
import Log from '../../models/log';
import { getLogs, deleteLogsById, deleteAllLogs } from '../../controllers/logs';

const { TEST_DB_URL } = config;
// Initialize app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Db connect
beforeAll(async (done) => {
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(TEST_DB_URL, { useMongoClient: true });
    await Log.collection.remove();
    log.error({ err: new Error('This is a error') }, 'Error message');
    done();
  } catch (error) {
    throw new Error(error);
  }
});

// Remove docs from log collections
afterAll(async (done) => {
  try {
    await Log.collection.remove();
    await mongoose.disconnect(done);
  } catch (error) {
    throw new Error(error);
  }
});

describe('Run tests for logs route handlers', () => {
  app.post('/logs/', getLogs);
  app.delete('/logs/', deleteLogsById);
  app.delete('/deleteall/', deleteAllLogs);

  let logId;

  // GET logs from
  test('Get logs request', () => {
    try {
      request(app)
        .post('/logs')
        .send({
          limit: 10,
          offset: 10,
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) {
            throw new Error(err);
          }

          const doc = res.body.docs[0];
          logId = doc._id; // eslint-disable-line
          expect(doc.msg).toEqual('Error message');
          expect(doc.level).toEqual(50);
          expect(doc).toHaveProperty('name');
          expect(doc).toHaveProperty('time');
          expect(doc).toHaveProperty('err');
        });
    } catch (err) {
      expect(err).toThrowErrorMatchingSnapshot();
      throw new Error(err);
    }
  });

  // Delete log by id
  test('Delete log by id from database', () => {
    try {
      request(app)
        .delete(`/logs?id${logId}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) {
            throw new Error(err);
          }
          expect(res.body).toHaveProperty('success');
          expect(res.body.success).toEqual(`Log ${logId} successfully deleted`);
        });
    } catch (err) {
      expect(err).toThrowErrorMatchingSnapshot();
      throw new Error(err);
    }
  });

  // Delete all logs
  test('Delete all logs from collection', () => {
    try {
      request(app).delete('/deleteall').end((err, res) => {
        if (err) {
          throw new Error(err);
        }
        expect(res.body).toHaveProperty('success');
        expect(res.body.success).toEqual('All logs successfully deleted');
      });
    } catch (err) {
      expect(err).toThrowErrorMatchingSnapshot();
      throw new Error(err);
    }
  });
});
