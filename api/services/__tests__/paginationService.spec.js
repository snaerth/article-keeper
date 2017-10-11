import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import createPaginationObject from '../paginationService';

// Initialize app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

describe('Run pagination service tests', () => {
  app.post('/pagination', async (req, res) => {
    const { page, limit } = req.body;
    const pagination = createPaginationObject(page, limit);
    return res.send(pagination);
  });

  // Get pagination
  test('Get pagination object from post request', () => {
    try {
      request(app)
        .post('/pagination')
        .send({
          page: 1,
          limit: 10,
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          const { page, limit } = res.body;
          expect(limit).toEqual(10);
          expect(page).toEqual(1);
        });
    } catch (err) {
      expect(err).toThrowErrorMatchingSnapshot();
      throw new Error(err);
    }
  });
});
