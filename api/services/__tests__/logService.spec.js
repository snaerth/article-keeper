import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import config from '../../config';
import log from '../logService';
import Log from '../../models/log';
import { getLogs, deleteLogs } from '../../controllers/logs';

const { TEST_DB_URL } = config;
// Initialize app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Db connect
beforeAll(async done => {
  try {
    await mongoose.connect(TEST_DB_URL);
    await Log.collection.remove();

    log.error({ err: new Error('This is a error') }, 'Error message');
    done();
  } catch (error) {
    throw new Error(error);
  }
});

// Remove docs from log collections
afterAll(async done => {
  try {
    await Log.collection.remove();
    await mongoose.disconnect(done);
  } catch (error) {
    throw new Error(error);
  }
});

describe('Run tests for log service', () => {
  app.post('/logs/', getLogs);
  app.delete('/logs/', deleteLogs);

  // GET logs from
  test('Get logs from route /logs ', () => {
    expect(1).toBe(1);

    try {
      request(app)
        .post('/logs')
        .send({
          limit: 10,
          offset: 10
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err || !res.ok) {
            throw new Error(err);
          }

          const { msg, level } = res.body.docs[0];
          expect(msg).toEqual('Error message');
          expect(level).toEqual(50);
        });
    } catch (err) {
      expect(err).toThrowErrorMatchingSnapshot();
      throw new Error(err);
    }
  });
});
