import mongoose from 'mongoose';
import Log from '../models/log';
import log from '../services/logService';
import createPaginationObject from '../services/paginationService';

/**
 * Delete log by id
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {*}
 * @author Snær Seljan Þóroddsson
 */
export async function deleteLogsById(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ error: 'No id found in query string' });
  }

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
 * Delete all logs
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {*}
 * @author Snær Seljan Þóroddsson
 */
export async function deleteAllLogs(req, res) {
  try {
    await Log.collection.remove();
    return res.status(200).send({ success: 'All logs successfully deleted' });
  } catch (err) {
    log.error({ req, res, err }, 'Error deleting all logs from database');
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
  const { offset, limit, msg, level, name, time } = req.body;
  // Get default pagination object
  const pagination = createPaginationObject(offset, limit);
  // Check if sort params exist in query string
  // If exist add them to pagination sort prop
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

/**
 * Get logs by search query string
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {*}
 * @author Snær Seljan Þóroddsson
 */
export async function getLogsBySearchQuery(req, res) {
  const { query, offset, limit, msg, level, name, time } = req.params;

  if (!query) {
    return res.status(422).send({
      error: 'Parameter query is required to perform log search',
    });
  }

  // Get default pagination object
  const pagination = createPaginationObject(offset, limit);
  // Check if sort params exist in query string
  // If exist add them to pagination sort prop
  const sort = {};
  if (msg) sort.msg = msg;
  if (level) sort.level = level;
  if (name) sort.name = name;
  if (time) sort.time = time;
  if (Object.keys(sort).length > 0) {
    pagination.sort = sort;
  }

  let searchQuery;

  // Check if searchQuery is valid mongo ObjectId
  if (query.match(/^[0-9a-fA-F]{24}$/)) {
    // Search query by id
    searchQuery = { _id: mongoose.Types.ObjectId(query) };
  } else {
    // Search query for for other Log properties
    searchQuery = {
      $or: [
        { msg: new RegExp(searchQuery, 'i') },
        { name: new RegExp(searchQuery, 'i') },
        { 'err.stack': new RegExp(searchQuery, 'i') },
        { 'req.statusCode': new RegExp(searchQuery, 'i') },
        { 'req.method': new RegExp(searchQuery, 'i') },
        { 'req.headers': new RegExp(searchQuery, 'i') },
        { 'res.header': new RegExp(searchQuery, 'i') },
        { 'res.statusCode': new RegExp(searchQuery, 'i') },
      ],
    };
  }

  try {
    // Fetch logs by search query from database
    const result = await Log.paginate(searchQuery, pagination);

    return res.status(200).send(result);
  } catch (err) {
    log.error({ req, res, err }, 'Error searching logs by query from database');
    return res.status(500).send({ error: err });
  }
}

/**
 * Create fake error logs
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {*}
 * @author Snær Seljan Þóroddsson
 */
export async function createFakeLogs(req, res) {
  let { count } = req.body;
  count = count || 10;

  try {
    const len = parseInt(count, 10);
    for (let i = 0; i < len; i++) {
      log.error(
        { req, res, err: new Error(`Fake Error log ${i}`) },
        `Fake Error log ${i}`,
      );
    }
    return res.status(200).send({ success: 'Fake logs successfully created' });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
}
