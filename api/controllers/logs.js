import Log from '../models/log';
import log from '../services/logService';
import getPagination from '../services/paginationService';

/**
 * Deletes logs
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {*}
 * @author Snær Seljan Þóroddsson
 */
export async function deleteLogs(req, res) {
  const { id } = req.params;

  try {
    const logId = await Log.findByIdAndRemove(id);
    return res
      .status(200)
      .send({ success: `Log ${logId} successfully deleted` });
  } catch (err) {
    log.error({ req, res, err }, 'Error deleting log from database');
    return res.status(500).send({ error: err });
  }
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
  const { msg, level, name, time } = req.body;
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
    log.error({ req, res, err }, 'Error getting logs from database');
    return res.status(500).send({ error: err });
  }
}
