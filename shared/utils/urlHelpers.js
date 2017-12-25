/**
 * Gets parameter name from query string
 * @param {String} url
 * @param {String} paramName
 * @return {String} value of param name
 */
// query string: ?foo=lorem&bar=&baz
export default function getParameterByName(url, paramName) {
  const name = paramName.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * Constructs query string from form data
 * @param {Object} formData
 * @return {String}
 * example: formData = {foo: 'foo', bar: 'bar'} = foo=foo&bar=bar
 */
export function formDataToQueryString(formData) {
  const queryParams = Object.entries(formData).map(e => `${encodeURIComponent(e[0])}=${encodeURIComponent(e[1])}`);

  return queryParams.join('&');
}
