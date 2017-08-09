/**
 * Gets default pagination params from request query string
 * and returns it as an object
 * @param {Object} req
 * @returns {Object} pagination default object
 */
export default async function getPagination(req) {
  return new Promise((resolve, reject) => {
    let { offset, limit } = req.body;

    if (!limit) {
      return reject('Limit param is required in query string');
    }

    try {
      // Pagination
      offset = parseInt(offset, 10);
      limit = parseInt(limit > 50 ? 50 : limit, 10);
      return {
        offset,
        limit,
      };
    } catch (err) {
      return reject(err);
    }
  });
}
