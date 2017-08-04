import Log from '../models/log';
import log from '../services/logService';

/**
 * Deletes logs
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {undefined}
 * @author Snær Seljan Þóroddsson
 */
export function deleteLogs(req, res) {
  // TODO implement
  res.status(200).send('Deleting logs');
}

/**
 * Get logs
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {*}
 * @author Snær Seljan Þóroddsson
 */
export async function getLogs(req, res) {
  let { offset, limit, sort } = req.query;
  if (!limit) {
    return res.status(422).send({
      error: 'Limit param is required in query string',
    });
  }

  try {
    // Pagination
    offset = parseInt(offset, 10);
    limit = parseInt(limit > 50 ? 50 : limit, 10);
    const pagination = {
      offset,
      limit,
    };

    if (sort) {
      pagination.sort = { sort };
    }

    // Fetch logs from database
    const result = await Log.paginate({}, pagination);
    return res.status(200).send(result);
  } catch (err) {
    log.error({ req, res, err }, 'Error getting logs from mongodb');
    return res.status(500).send({ error: err });
  }
}
