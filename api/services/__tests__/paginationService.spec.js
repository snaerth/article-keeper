import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import getPagination from '../paginationService';

// Initialize app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

describe('Test for pagination service', () => {
  app.post('/paginationTest/', (req, res, next) => {
    const pagination = getPagination(req);
    return res.send(pagination);
  });

  // FileExists
  test('Log error to mongodb', () => {
    try {
      request(app)
        .post('/paginationTest/')
        .send({
          limit: 10,
          offset: 10
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err || !res.ok) {
            throw new Error(err);
          }

          const { level, limit } = res;
          expect(limit).toEqual(10);
          expect(level).toEqual(10);
        });
    } catch (err) {
      expect(err).toThrowErrorMatchingSnapshot();
      throw new Error(err);
    }
  });
});
