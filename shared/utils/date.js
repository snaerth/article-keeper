// @flow

/**
 * Adds zero in front of time param if it's length is less than 10
 * @param {string} time
 * @returns {string}
 */
function checkTime(time: ?string): string {
  return time < 10 ? `0${time}` : time;
}

/**
 * Formats date string to format yyyy-MM-dd HH:mm:ss
 * @param {string} date
 * @returns {string} date
 */
export default function formatISODateTime(date) {
  const dt = new Date(date);
  const year = dt.getFullYear();
  const month = checkTime(dt.getMonth() + 1);
  const day = checkTime(dt.getDate());
  const hh = dt.getHours();
  const mm = checkTime(dt.getMinutes());
  const ss = checkTime(dt.getSeconds());

  // yyyy-MM-dd HH:mm:ss
  return `${year}-${month}-${day} ${hh}:${mm}:${ss}`;
}
