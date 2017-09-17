import { MODAL_OPEN, MODAL_CLOSE, ERROR_UNKNOWN } from './types';

/**
 * Handles error from server
 *
 * @returns {Object} action
 * @author Snær Seljan Þóroddsson
 */
export function authError(type, error) {
  let payload = 'Error in authError';

  if (error.message) {
    payload = error.message;
    return { type: ERROR_UNKNOWN, payload };
  }

  if (error.response) {
    if (error.response.data && error.response.data.error) {
      payload = error.response.data.error;
    } else if (error.response.data) {
      payload = error.response.data;
    }

    if (error.response.status === 401) {
      payload = 'Unauthorized';
    }

    if (
      payload &&
      typeof payload === 'string' &&
      payload.toLowerCase() === 'proxy_error'
    ) {
      payload = 'Error connecting to server';
    }
  }

  return { type, payload };
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
