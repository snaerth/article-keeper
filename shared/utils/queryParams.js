/**
 * Gets parameter name from query string
 * @param {String} paramName
 * @return {String} value of param name
 * @author Snær Seljan Þóroddsson
 */
// query string: ?foo=lorem&bar=&baz
export default function getParameterByName(paramName) {
  const url = window.location.href;
  const name = paramName.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
