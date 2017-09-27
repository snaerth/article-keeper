/**
 * Validates email
 * @param {String} email
 * @return {boolean}
 * @author Snær Seljan Þóroddsson
 */
export default function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

/**
 * Validates if string is phone number
 *
 * @param {String} phone
 * @returns {bool}
 */
export function isPhoneNumber(phone) {
  return (
    /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(phone) ||
    /^\d{3}(:?[\s-])*\d{4}$/.test(phone)
  );
}
