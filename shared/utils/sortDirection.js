const SortDirection = {
  /**
   * Sort items in ascending order.
   * This means arranging from the lowest value to the highest (e.g. a-z, 0-9).
   */
  ASC: 'ASC',

  /**
   * Sort items in descending order.
   * This means arranging from the highest value to the lowest (e.g. z-a, 9-0).
   */
  DESC: 'DESC',
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
  let exists = false;

  if (sort.length !== 0) {
    for (let i = 0; i < sort.length; i++) {
      if (sort[i].sortBy === sortBy) {
        exists = true;
        // Toggle sort direction
        sort[i].sortDirection =
          sort[i].sortDirection === SortDirection.ASC
            ? SortDirection.DESC
            : SortDirection.ASC;
        // Set
        currentSort.sortBy = sortBy;
        currentSort.sortDirection = sort[i].sortDirection;
        break;
      }
    }
  } else {
    sort.push({ sortBy, sortDirection });
  }

  if (!exists) {
    sort.push({ sortBy, sortDirection });
  }

  return {
    sort,
    currentSort,
  };
}
