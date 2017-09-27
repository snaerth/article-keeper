/**
 * Validates if string is Icelandic phone number
 *
 * @param {String} phone
 * @returns {bool}
 */
export function isIcelandicPhoneNumber(phone) {
  return /^(?:\+|[0]{2})?(354)?(:?[\s-])*\d{3}(:?[\s-])*\d{4}$/.test(phone);
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

/**
 * Validates email string
 * @param {String} email - Email string
 * @returns true if valid, false otherwise
 */
export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

/**
 * Validates if string is valid seo url friendly string
 * @param {String} str
 */
export function validateSeoUrl(str) {
  return /^[a-zA-Z0-9-]+$/g.test(str);
}
