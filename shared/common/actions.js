import { MODAL_OPEN, MODAL_CLOSE, MENU_OPEN, MENU_CLOSE, ERROR_UNKNOWN } from './types';

/**
 * Handles error from server
 *
 * @returns {Object} action
 * @author Snær Seljan Þóroddsson
 */
export function authError(type, error) {
  let payload = 'Error in authError';

  if (error.response) {
    if (error.response.data && error.response.data.error) {
      payload = error.response.data.error;
    } else if (error.response.data) {
      payload = error.response.data;
    }

    if (error.response.status === 401) {
      payload = 'Unauthorized';
    }

    if (payload && typeof payload === 'string' && payload.toLowerCase() === 'proxy_error') {
      payload = 'Error connecting to server';
    }
  } else if (error.message) {
    payload = error.message;
    return { type: ERROR_UNKNOWN, payload };
  }

  return { type, payload };
}

/**
 * Handles error from server and returns error as a strintg
 *
 * @param {Object|String} error
 * @returns {String} err
 * @author Snær Seljan Þóroddsson
 */
export function errorHelper(error) {
  let err = '';

  if (error.response) {
    if (error.response.data && error.response.data.error) {
      err = error.response.data.error;
    } else if (error.response.data) {
      err = error.response.data;
    }

    if (error.response.status === 401) {
      err = 'Unauthorized';
    }

    if (err && typeof err === 'string' && err.toLowerCase() === 'proxy_error') {
      err = 'Error connecting to server';
    }
  } else if (error.message) {
    err = error.message;
  }

  return err;
}

/**
 * Open modal action createor
 *
 * @returns {Object}
 * @author Snær Seljan Þóroddsson
 */
export function openModal() {
  return { type: MODAL_OPEN };
}

/**
 * Close modal action createor
 *
 * @returns {Object}
 * @author Snær Seljan Þóroddsson
 */
export function closeModal() {
  return { type: MODAL_CLOSE };
}

/**
 * Open menu
 *
 * @returns {Object}
 * @author Snær Seljan Þóroddsson
 */
export function openMenu() {
  return { type: MENU_OPEN };
}

/**
 * Close menu
 *
 * @returns {Object}
 * @author Snær Seljan Þóroddsson
 */
export function closeMenu() {
  return { type: MENU_CLOSE };
}
