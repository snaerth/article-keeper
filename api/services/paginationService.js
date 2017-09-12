/**
 * Creates default pagination object
 * @param {Number} offset
 * @param {String} limit
 * @returns {Object} pagination
 */
export default function createPaginationObject(offset = 0, limit = 50) {
  // Pagination
  return {
    offset: parseInt(offset, 10),
    limit: parseInt(limit > 100 ? 100 : limit, 10),
  };
}
