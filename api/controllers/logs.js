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
 * Get logs
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {*}
 * @author Snær Seljan Þóroddsson
 */
export async function getLogs(req, res) {
  const { limit, msg, level, name, time, page } = req.query;

  // Get default pagination object
  let pagination = createPaginationObject(page, limit);
  // Enrich pagination object
  pagination = addToPaginationObject(pagination, msg, level, name, time);

  try {
    // Fetch logs from database
    const result = await Log.paginate({}, pagination);
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
  const { query, limit, msg, level, name, time, page } = req.params;
  const { startDate, endDate } = req.query;

  if (!query) {
    return res.status(422).send({
      error: 'Parameter query is required to perform log search',
    });
  }

  // Get default pagination object
  let pagination = createPaginationObject(page, limit);
  // Enrich pagination object
  pagination = addToPaginationObject(pagination, msg, level, name, time);

  const searchQuery = {};
  let $or = [];
  // Check if searchQuery is valid mongo ObjectId
  if (query.match(/^[0-9a-fA-F]{24}$/)) {
    // Search query by id
    $or = [{ _id: mongoose.Types.ObjectId(query) }];
  } else {
    const reExp = new RegExp(query, 'i');
    // Search query for for other Log properties
    $or = [
      { msg: reExp },
      { name: reExp },
      { 'err.stack': reExp },
      { 'req.statusCode': reExp },
      { 'req.method': reExp },
      { 'req.headers': reExp },
      { 'res.header': reExp },
      { 'res.statusCode': reExp },
    ];
  }

  try {
    if (startDate && endDate) {
      const gte = await parseDateYearMonthDay(startDate);
      const lte = await parseDateYearMonthDay(endDate);

      // Search query for text search and date range
      searchQuery.$and = [
        {
          $or,
        },
        {
          time: { $gte: gte, $lte: lte },
        },
      ];
    } else {
      // Search query for text search
      searchQuery.$or = $or;
    }

    // Fetch logs by search query from database
    const result = await Log.paginate(searchQuery, pagination);
    return res.status(200).send(result);
  } catch (err) {
    log.error({ req, res, err }, 'Error searching logs by query');
    return res.status(500).send({ error: err });
  }
}

/**
 * Get logs by date range. Date format should be YYYY-MM-DD
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {*}
 * @author Snær Seljan Þóroddsson
 */
export async function getLogsByDateRange(req, res) {
  const { startDate, endDate } = req.params;

  if (!startDate && !endDate) {
    return res.status(422).send({
      error: 'Parameters startDate and endDate are required and have to be on valid date format YYYY-mm-dd',
    });
  }

  const { limit, msg, level, name, time, page } = req.params;

  // Get default pagination object
  let pagination = createPaginationObject(page, limit);
  // Enrich pagination object
  pagination = addToPaginationObject(pagination, msg, level, name, time);

  try {
    const gte = await parseDateYearMonthDay(startDate);
    const lte = await parseDateYearMonthDay(endDate);
    const query = {
      $or: [
        {
          time: { $gte: gte, $lte: lte },
        },
      ],
    };

    // Fetch logs by search query from database
    const result = await Log.paginate(query, pagination);

    return res.status(200).send(result);
  } catch (err) {
    log.error({ req, res, err }, 'Error searching logs by date range query');
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
