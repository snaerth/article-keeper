/**
 * Parse a date in yyyy-mm-dd format
 * @param {String} str - Date format string yyyy-mm-dd
 */
export default function parseDateYearMonthDay(str) {
  return new Promise((resolve, reject) => {
    const parts = str.split('-');

    try {
      const year = parts[0];
      const month = parts[1] - 1; // Note: months are 0-based
      const day = parts[2];
      const date = new Date(
        parseInt(year, 10),
        parseInt(month, 10),
        parseInt(day, 10),
      );

      return resolve(date);
    } catch (error) {
      return reject(error);
    }
  });
}
