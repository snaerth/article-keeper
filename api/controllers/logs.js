import Log from '../models/log';
import log from '../services/logService';
import getPagination from '../services/paginationService';

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
  // Get default pagination object
  const pagination = getPagination(req);
  // Check if sort params exist in query string
  // If exist add them to pagination sort prop
  const { msg, level, name, time } = req.query;
  const sort = {};
  if (msg) sort.msg = msg;
  if (level) sort.level = level;
  if (name) sort.name = name;
  if (time) sort.time = time;
  if (Object.keys(sort).length !== 0) {
    pagination.sort = sort;
  }

  try {
    // Fetch logs from database
    const result = await Log.paginate({}, pagination);
    return res.status(200).send(result);
  } catch (err) {
    log.error({ req, res, err }, 'Error getting logs from mongodb');
    return res.status(500).send({ error: err });
  }
}
