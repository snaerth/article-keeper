/**
 * Gets default pagination params from prost request
 * and returns it as an object
 * @param {Object} req
 * @returns {Object} pagination default object
 */
export default async function getPagination(req) {
  return new Promise((resolve, reject) => {
    let { offset, limit } = req.body;

    if (!limit) {
      return reject('Limit param is required in post data');
    }

    try {
      // Pagination
      offset = parseInt(offset, 10) || 0;
      limit = parseInt(limit > 100 ? 100 : limit, 10) || 50; // Limit size to 100 items

      return resolve({
        offset,
        limit,
      });
    } catch (err) {
      return reject(err);
    }
  });
}

/**
 * Gets default pagination params from request query string
 * and returns it as an object
 * @param {Object} req
 * @returns {Object} pagination default object
 */
export async function getPaginationFromQueryString(req) {
  return new Promise((resolve, reject) => {
    let { offset, limit } = req.params;

    try {
      // Pagination
      offset = parseInt(offset, 10) || 0;
      limit = parseInt(limit > 100 ? 100 : limit, 10) || 50;

      return resolve({
        offset,
        limit,
      });
    } catch (err) {
      return reject(err);
    }
  });
}
