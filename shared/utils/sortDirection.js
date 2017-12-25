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
  const currentSort = { sortBy, sortDirection: sortDirection.toLowerCase() };

  if (sort.length !== 0) {
    const i = sort.findIndex(item => item.sortBy === sortBy);

    if (i !== -1) {
      currentSort.sortDirection =
        sort[i].sortDirection === SortDirection.ASC
          ? SortDirection.DESC.toLowerCase()
          : SortDirection.ASC.toLowerCase();

      sort.splice(i, 1);
      sort.push(currentSort);
    } else {
      sort.push({ sortBy, sortDirection });
    }
  } else {
    sort.push(currentSort);
  }

  return {
    sort,
    currentSort,
  };
}
