import mongoose from 'mongoose';
import Log from '../models/log';
import log from '../services/logService';
import createPaginationObject from '../services/paginationService';
import dbSortValues from '../services/dbService';
import parseDateYearMonthDay from '../utils/date';

// Sort values for sorting in mongodb
const sortVals = dbSortValues(); // [-1,1,'asc','desc']

/**
 * Enriches pagination object with sort and other pagination properties
 *
 * @param {Object} pagination - { limit: Number, offset: Number }
 * @param {String|Number} msg
 * @param {String|Number} level
 * @param {String|Number} name
 * @param {String|Number} time
 * @returns {Object} sort
 */
function addToPaginationObject(
  pagination,
  msg = 1,
  level = 1,
  name = 1,
  time = 1,
) {
  const sort = {};
  if (sortVals.includes(msg)) sort.msg = msg;
  if (sortVals.includes(level)) sort.level = level;
  if (sortVals.includes(name)) sort.name = name;
  if (sortVals.includes(time)) sort.time = time;
  if (Object.keys(sort).length !== 0) {
    pagination.sort = sort;
  }

  return pagination;
}

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
 * Creates search query for mongoose Log model
 *
 * @param {String} query
 * @param {Object} startDate - Date object
 * @param {Object} endDate - Date object
 * @return {Object} searchQuery - Mongoose search query for Log
 */
async function prepareMongooseDataBaseQuery(query, startDate, endDate) {
  const searchQuery = {};
  const $or = [];
  const $and = [];

  if (query) {
    // Check if searchQuery is valid mongo ObjectId
    if (query.match(/^[0-9a-fA-F]{24}$/)) {
      // Search query by id
      $or.push({ _id: mongoose.Types.ObjectId(query) });
    } else {
      const reExp = new RegExp(query, 'i');
      // Search query for for other Log properties
      $or.push(
        { msg: reExp },
        { name: reExp },
        { 'err.stack': reExp },
        { 'req.statusCode': reExp },
        { 'req.method': reExp },
        { 'req.headers': reExp },
        { 'res.header': reExp },
        { 'res.statusCode': reExp },
      );
    }
  }

  if (startDate && endDate) {
    const gte = await parseDateYearMonthDay(startDate);
    const lte = await parseDateYearMonthDay(endDate);
    // Search query for text search and date range
    $and.push({
      $or: [
        {
          time: { $gte: gte, $lte: lte },
        },
      ],
    });
  }

  if ($and.length > 0 && $or.length > 0) {
    $and.push({ $or });
    searchQuery.$and = $and;
  } else if ($and.length > 0) {
    searchQuery.$and = $and;
  } else if ($or.length > 0) {
    searchQuery.$or = $or;
  }

  return searchQuery;
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
  const {
    query,
    startDate,
    endDate,
    limit,
    msg,
    level,
    name,
    time,
    page,
  } = req.query;

  // Get default pagination object
  let pagination = createPaginationObject(page, limit);
  // Enrich pagination object
  pagination = addToPaginationObject(pagination, msg, level, name, time);

  try {
    const searchQuery = await prepareMongooseDataBaseQuery(
      query,
      startDate,
      endDate,
    );
    // Fetch logs from database
    const result = await Log.paginate(searchQuery, pagination);
    return res.status(200).send(result);
  } catch (err) {
    log.error({ req, res, err }, 'Error getting logs');
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
  const { startDate, endDate, limit, msg, level, name, time, page } = req.query;
  const { query } = req.params;

  if (!query) {
    return res.status(422).send({
      error: 'Parameter query is required to perform log search',
    });
  }

  // Get default pagination object
  let pagination = createPaginationObject(page, limit);
  // Enrich pagination object
  pagination = addToPaginationObject(pagination, msg, level, name, time);

  try {
    const searchQuery = await prepareMongooseDataBaseQuery(
      query,
      startDate,
      endDate,
    );
    // Fetch logs by search query from database
    const result = await Log.paginate(searchQuery, pagination);
    return res.status(200).send(result);
  } catch (err) {
    log.error({ req, res, err }, 'Error searching logs by query');
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
    log.error({ req, res, err }, 'Error creating fake logs');
    return res.status(500).send({ error: err });
  }
}
