/**
 * Creates default pagination object
 * @param {Number} page
 * @param {Number} limit
 * @returns {Object} pagination
 */
export default function createPaginationObject(page = 1, limit = 100) {
  // Pagination
  return {
    page: parseInt(page || 1, 10),
    limit: parseInt(limit > 1000 ? 1000 : limit || 100, 10),
  };
}
