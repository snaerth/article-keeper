/**
 * Validates email string
 * @param {String} email - Email string
 * @returns true if valid, false otherwise
 */
exports.validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

/**
 * Deep trims every property in object
 * @param {Object} obj - incoming argument to trim
 */
exports.deepTrim = function deepTrim(obj) {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const type = typeof value;

    if (
      value != null &&
      (type === 'string' || type === 'object') &&
      Object.prototype.hasOwnProperty.call(obj, key)
    ) {
      if (type === 'object') {
        deepTrim(obj[key]);
      } else {
        obj[key] = obj[key].trim();
      }
    }
  });
};

/**
 * Splits array into chunks
 * For example splitToChunks([1,2,3,4,5,6,7,8,9], 3)
 * @param {Array} arr - Array
 * @param {Int} chunk - Integer number
 * @returns a new array divided into chunks size[[1,2.3],[4,5,6],[7,8,9]]
 */
exports.splitToChunks = (arr, chunk) => {
  const newarr = [];

  for (let i = 0; i < arr.length; i += chunk) {
    newarr.push(arr.slice(i, i + chunk));
  }

  return newarr;
};
