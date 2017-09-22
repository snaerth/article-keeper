import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import config from '../../config';
import log from '../../services/logService';
import Log from '../../models/log';
import {
  getLogs,
  deleteLogsById,
  deleteAllLogs,
  getLogsBySearchQuery,
} from '../../controllers/logs';

const { TEST_DB_URL } = config;
// Initialize app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.Promise = global.Promise;

app.get('/logs/', getLogs);
app.get('/logs/search/:query', getLogsBySearchQuery);
app.delete('/log/:id', deleteLogsById);
app.delete('/deleteall/', deleteAllLogs);

// Db connect
beforeAll(async (done) => {
  try {
    await mongoose.connect(TEST_DB_URL, { useMongoClient: true });
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
  // GET logs
  test('Get logs', () => {
    try {
      request(app)
        .get('/logs')
        .query({
          limit: 50,
          page: 1,
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          const doc = res.body.docs[0];
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

  // GET logs by search query
  test('Get logs by search query', () => {
    try {
      request(app)
        .get('/logs/search/Application name')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) {
            throw new Error(err);
          }

          const doc = res.body.docs[0];
          expect(doc.name).toEqual('Application name');
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
    let logId;

    try {
      request(app)
        .get('/logs')
        .query({
          limit: 50,
          offset: 10,
        })
        .set('Accept', 'application/json')
        .then((res) => Promise.resolve(res))
        .then((res) => {
          logId = res;

          return request(app)
            .delete(`/log/${logId}`)
            .set('Accept', 'application/json');
        })
        .then((res) => {
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
        expect(res.body).toHaveProperty('success');
        expect(res.body.success).toEqual('All logs successfully deleted');
      });
    } catch (err) {
      expect(err).toThrowErrorMatchingSnapshot();
      throw new Error(err);
    }
  });
});
