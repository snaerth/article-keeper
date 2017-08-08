import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import getPagination from '../paginationService';

// Initialize app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

describe('Run pagination service tests', () => {
  app.post('/paginationTest/', async (req, res, next) => {
    const pagination = await getPagination(req);
    return res.send(pagination);
  });

  // Get pagination
  test('Get pagination object', () => {
    try {
      request(app)
        .post('/paginationTest/')
        .send({
          limit: 10,
          offset: 10,
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) {
            throw new Error(err);
          }

          const { level, limit } = res.body;
          expect(limit).toEqual(10);
          expect(level).toEqual(10);
        });
    } catch (err) {
      expect(err).toThrowErrorMatchingSnapshot();
      throw new Error(err);
    }
  });
});
