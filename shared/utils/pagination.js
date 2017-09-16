/**
 * Creates pagination object
 *
 * @param {Number} limit
 * @param {Number} pages
 * @param {Number} page
 * @param {Number} total
 * @returns {Object} pagination
 */
export default function createPagination(limit, pages, page, total) {
  try {
    const prev = page <= 1 ? 1 : page - 1;
    const next = page >= pages ? parseInt(pages, 10) : page + 1;

    return {
      page,
      pages: parseInt(pages, 10),
      limit,
      total,
      prev,
      next,
    };
  } catch (error) {
    throw new Error(error);
  }
}
