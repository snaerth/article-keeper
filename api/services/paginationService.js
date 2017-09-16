/**
 * Creates default pagination object
 * @param {Number} page
 * @param {Number} limit
 * @returns {Object} pagination
 */
export default function createPaginationObject(page = 1, limit = 50) {
  // Pagination
  return {
    page: parseInt(page, 10),
    limit: parseInt(limit > 100 ? 100 : limit, 10),
  };
}
