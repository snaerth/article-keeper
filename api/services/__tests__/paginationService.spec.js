import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import createPaginationObject from '../paginationService';

// Initialize app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

describe('Run pagination service tests', () => {
  app.post('/pagination/', async (req, res) => {
    const { offset, limit } = req.body;
    const pagination = createPaginationObject(offset, limit);
    return res.send(pagination);
  });

  // Get pagination
  test('Get pagination object from post request', () => {
    try {
      request(app)
        .post('/pagination/')
        .send({
          limit: 10,
          offset: 10,
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          const { offset, limit } = res.body;
          expect(limit).toEqual(10);
          expect(offset).toEqual(10);
        });
    } catch (err) {
      expect(err).toThrowErrorMatchingSnapshot();
      throw new Error(err);
    }
  });
});
