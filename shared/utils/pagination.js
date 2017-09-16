/**
 * Creates pagination object
 *
 * @param {Object: { limit, pages, page, total } }
 * @returns {Object} pagination
 */
export default function createPagination({ limit, pages, page, total }) {
  const prev = page <= 1 ? 1 : page - 1;
  const next = page >= pages ? pages : page + 1;

  return {
    page,
    pages,
    limit,
    total,
    prev,
    next,
  };
}
