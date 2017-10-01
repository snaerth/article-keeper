/**
 * Adds zero in front of time param if it's length is less than 10
 *
 * @param {string} time
 * @returns {string}
 */
export function checkTime(time) {
  return time < 10 ? `0${time}` : time;
}

/**
 * Formats date string to format yyyy-MM-dd HH:mm:ss
 *
 * @param {string} date
 * @returns {string} date
 */
export default function formatISODateTime(date) {
  try {
    const dt = new Date(date);
    const year = dt.getFullYear();
    const month = checkTime(dt.getMonth() + 1);
    const day = checkTime(dt.getDate());
    const hh = dt.getHours();
    const mm = checkTime(dt.getMinutes());
    const ss = checkTime(dt.getSeconds());

    // yyyy-MM-dd HH:mm:ss
    return `${year}-${month}-${day} ${hh}:${mm}:${ss}`;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Formats date string to format yyyy-MM-dd
 *
 * @param {string} date
 * @returns {string} date
 */
export function formatISODate(date) {
  try {
    const dt = new Date(date);
    const year = dt.getFullYear();
    const month = checkTime(dt.getMonth() + 1);
    const day = checkTime(dt.getDate());

    // yyyy-MM-dd
    return `${year}-${month}-${day}`;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Formats date to HTML5 inputs date format mm-dd-yyyy
 *
 * @param {string} date
 * @returns {string} date
 */
export function formatInputDate(date) {
  try {
    const dt = new Date(date);
    const year = dt.getFullYear();
    const month = checkTime(dt.getMonth() + 1);
    const day = checkTime(dt.getDate());

    // yyyy-MM-dd
    return `${year}-${month}-${day}`;
  } catch (error) {
    throw new Error(error);
  }
}

const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

/**
 * Formats date to HTML5 inputs date format dd monthname yyyy
 * @param {string} date
 * @returns {string} date
 */
export function formatDateWithMonthName(date) {
  try {
    const dt = new Date(date);
    const year = dt.getFullYear();
    const month = dt.getMonth();
    const day = dt.getDate();

    // dd monthname yyyy
    return `${day} ${months[month]} ${year}`;
  } catch (error) {
    throw new Error(error);
  }
}
