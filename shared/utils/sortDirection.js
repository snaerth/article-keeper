const SortDirection = {
  /**
   * Sort items in ascending order.
   * This means arranging from the lowest value to the highest (e.g. a-z, 0-9).
   */
  ASC: 'asc',

  /**
   * Sort items in descending order.
   * This means arranging from the highest value to the lowest (e.g. z-a, 9-0).
   */
  DESC: 'desc',
};

export default SortDirection;

/**
 * Adds sort object to sort if it does not exist
 * and filters out currentSort object by sortBy prop
 * Changes sort direction from prev direction
 *
 * @param {Array} sort
 * @param {String} sortBy
 * @param {String} sortDirection
 * @returns {Object} { sort:Array, currentSort:Object}
 */
export function sortHelper(sort, sortBy, sortDirection) {
  const currentSort = { sortBy, sortDirection };

  if (sort.length !== 0) {
    for (let i = 0; i < sort.length; i++) {
      if (sort[i].sortBy === sortBy) {
        // Toggle sort direction
        sort[i].sortDirection =
          sort[i].sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
        // Set
        currentSort.sortBy = sortBy;
        currentSort.sortDirection = sort[i].sortDirection;
        break;
      }
    }
  }

  return {
    sort,
    currentSort,
  };
}
