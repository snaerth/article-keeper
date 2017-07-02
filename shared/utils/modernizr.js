/**
 * Checks if localstorage is availiable
 * @return {boolean}
 * @author Snær Seljan Þóroddsson
 */
export default function localStorageChecker() {
  const test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}
